import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class CustomFileUploader extends Component {

  state = {
    name: '',
    isUploading: false,
    fileUrl: '',
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true });
  }

  handleUploadError = () => {
    this.setState({ isUploading: false });
  }

  handleUploadSuccess = fileName => {
    this.setState({
      isUploading: false,
      name: fileName,
    });

    firebase.storage().ref(this.props.dir)
      .child(fileName).getDownloadURL().then(fileUrl => {
        this.setState({ fileUrl })
      });

    this.props.fileName(fileName);
  }

  static getDerivedStateFromProps = (nextProps, nextState) => {
    if (nextProps.defaultImage) {
      return nextState = {
        name: nextProps.defaultImageName,
        fileUrl: nextProps.defaultImage,
      }
    }

    return null;
  }

  resetImage = () => {
    this.setState({
      name: '',
      isUploading: false,
      fileUrl: '',
    });

    this.props.resetImage();
  }

  render() {
    const {
      fileUrl,
      isUploading,
      name,
    } = this.state;
    return (
      <div>
        {!fileUrl && <div>
          <div className='label_inputs'>
            {this.props.tag}
          </div>
          <FileUploader
            accept='image/*'
            name='image'
            randomizeFilename
            storageRef={firebase.storage().ref(this.props.dir)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
          />
        </div>}

        {isUploading &&
          <div
            className='progress'
            style={{
              textAlign: 'center',
              margin: '30px 0',
            }}
          >
            <CircularProgress
              style={{ color: '#98c6e9' }}
              thickness={7}
            />
          </div>
        }

        {fileUrl &&
          <div className='image_upload_container'>
            <img
              style={{
                width: '100%',
              }}
              src={fileUrl}
              name={name}
            />
            <div
              className='remove'
              onClick={this.resetImage}
            >
              Remove
            </div>
          </div>}
      </div>
    )
  }
}
