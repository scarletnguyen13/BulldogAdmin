import React, { Component } from 'react';
import './DropZone.css';
import cloudUpload from '../../assets/images/baseline-cloud_upload-24px.svg';

class DropZone extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      highlight: false,
    };

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onFilesAdded(event) {
    const { disabled, onFilesAdded } = this.props;
    if (disabled) return;
    const { files } = event.target;
    if (onFilesAdded) {
      const array = this.fileListToArray(files);
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onFilesAdded(array);
    }
  }

  onDragOver(event) {
    event.preventDefault();

    const { disabled } = this.props;
    if (disabled) return;
    this.setState({ highlight: true });
  }

  onDragLeave() {
    this.setState({ highlight: false });
  }

  onDrop(event) {
    event.preventDefault();
    const { disabled } = this.props;
    if (disabled) return;

    const { files } = event.dataTransfer;
    const { onFilesAdded } = this.props;
    if (onFilesAdded) {
      const array = this.fileListToArray(files);
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onFilesAdded(array);
    }
    this.setState({ highlight: false });
  }

  fileListToArray(list) {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  openFileDialog() {
    const { disabled } = this.props;
    if (disabled) return;
    this.fileInputRef.current.click();
  }

  render() {
    const { highlight } = this.state;
    const { disabled } = this.props;

    return (
      <div
        className={`dropzone ${highlight ? 'highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
        role="presentation"
      >
        <img
          alt="upload"
          className="upload-icon"
          src={cloudUpload}
          margin={0}
        />
        <input
          ref={this.fileInputRef}
          className="file-input"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <span>Upload Files</span>
      </div>
    );
  }
}

export default DropZone;
