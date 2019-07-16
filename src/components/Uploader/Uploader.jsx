import React, { Component, Fragment } from 'react';
import './Uploader.css';
import checkmark from '../../assets/images/baseline-check_circle_outline-24px.svg'
import DropZone from '../DropZone/DropZone';
import ProgressBar from '../ProgressBar/ProgressBar';
import axios from 'axios';

const PORT = 8000;
const BASE_URL = `http://localhost:${PORT}/`;

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], //files to be uploaded
      fileURLs: [], //URLs of the uploaded files
      uploading: false, //keep track if the component is currently busy loading
      successfullUploaded: false, //if the upload succeeded
      uploadProgress: {} //keep track the progress of all files
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.renderProgress = this.renderProgress.bind(this);
  }

  //Handling new files added via the dropzone
  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files) //add the new files to the already added files
    }));
  }

  async uploadFiles() {
    this.setState({ 
      uploadProgress: {}, 
      uploading: true 
    });
    const { files } = this.state; 
    const promises = [];
    files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try { 
      await Promise.all(promises);
      this.setState({
        successfullUploaded: true, 
        uploading: false,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  sendRequest(file) {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return axios
    .post(BASE_URL + 'upload', formData, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (progressEvent.loaded / progressEvent.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      }
    })
    .then(response => {
      this.setState({
        fileURLs: [ response.data.fileURL, ...this.state.fileURLs ]
      });
      this.props.handleFileURLs(response, file.name);
    })
  }

  renderActions() {
    const { successfullUploaded, files, uploading } = this.state;
    if (successfullUploaded) {
      return (
        <button
          className='upload-button'
          type="submit"
          onClick={() => {
            this.setState({ 
              files: [], successfullUploaded: false 
            });
          }}
        >
          Clear
        </button>
      );
    } else {
      return (
        <button 
          className='upload-button'
          type="submit"
          disabled={files.length < 0 || uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  renderProgress(file) {
    // eslint-disable-next-line react/destructuring-assignment
    const uploadProgress = this.state.uploadProgress[file.name];
    const { uploading, successfullUploaded } = this.state;
    if (uploading || successfullUploaded) {
      return (
        <div>
          <ProgressBar progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="check-icon"
            alt="done"
            src={checkmark}
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  render() {
    const { uploading, successfullUploaded, files } = this.state;
    return(
      <Fragment>
        <div className='uploader-container'>
          <div className='card'>
            <div className="upload">
              <div className="content">
                <div>
                  <DropZone 
                    onFilesAdded={this.onFilesAdded}
                    disabled={uploading || successfullUploaded}
                  />
                </div>
                <div className="files">
                  {files.map(file => {
                    return (
                      <div key={file.name} className="uploaderRow">
                        <img alt="img" src={URL.createObjectURL(file)} className="file-preview" />
                        <div className="column">
                          <span className="file-name">{file.name}</span>
                          {this.renderProgress(file)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="actions">{this.renderActions()}</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Uploader;