import React, { Component, Fragment } from 'react';
import './Uploader.css';
import checkmark from './baseline-check_circle_outline-24px.svg'
import DropZone from '../DropZone/DropZone';
import ProgressBar from '../ProgressBar/ProgressBar';

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], //files to be uploaded
      uploading: false, //keep track if the component is currently busy loading
      successfullyUploaded: false, //if the upload succeeded
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
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);
  
      this.setState({ 
        successfullUploaded: true, 
        uploading: false 
      });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ 
        successfullUploaded: true, 
        uploading: false 
      });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
     const req = new XMLHttpRequest();
   
     req.upload.addEventListener("progress", event => {
      if (event.lengthComputable) {
       const copy = { ...this.state.uploadProgress };
       copy[file.name] = {
        state: "pending",
        percentage: (event.loaded / event.total) * 100
       };
       this.setState({ uploadProgress: copy });
      }
     });
      
     req.upload.addEventListener("load", event => {
      const copy = { ...this.state.uploadProgress };
      copy[file.name] = { state: "done", percentage: 100 };
      this.setState({ uploadProgress: copy });
      resolve(req.response);
     });
      
     req.upload.addEventListener("error", event => {
      const copy = { ...this.state.uploadProgress };
      copy[file.name] = { state: "error", percentage: 0 };
      this.setState({ uploadProgress: copy });
      reject(req.response);
     });
   
     const formData = new FormData();
     formData.append("file", file, file.name);
   
     req.open("POST", "http://localhost:8000/upload");
     req.send(formData);
    });
   }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          className='upload-button'
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
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={() => {
            this.uploadFiles();
          }}
        >
          Upload
        </button>
      );
    }
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
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
    return(
      <Fragment>
        <div className='uploader-container'>
          <div className='card'>
            <div className="upload">
              <div className="content">
                <div>
                  <DropZone 
                    onFilesAdded={this.onFilesAdded}
                    disabled={this.state.uploading || this.state.successfullyUploaded}
                  />
                </div>
                <div className="files">
                  {this.state.files.map(file => {
                    return (
                      <div key={file.name} className="row">
                        <img alt="img" src={URL.createObjectURL(file)} className="file-preview"/>
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