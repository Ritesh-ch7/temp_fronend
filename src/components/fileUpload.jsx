import React from 'react';
import axios from 'axios'; // Import Axios
import fileIcon from '../assets/upload-file-svgrepo-com.svg';
import {useState} from 'react' // Import the SVG file
import uploadIcon from '../assets/upload_icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class FileUpload extends React.Component {
  handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append('file', file);
    console.log('filename',file.name) 
    try {
      if (this.props.onStart) {
        this.props.onStart(); 
      }

      const response = await axios.post('http://127.0.0.1:8000/api/v1/upload/pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      console.log('File uploaded successfully:', response.data);
      localStorage.setItem('filename', response.data.filename);
      if (this.props.onSuccess) {
        this.props.onSuccess(); 
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  render() {
    return (
      <div className="flex items-center flex-col">
        <input
          type="file"
          id="fileInput"
          ref={(fileInput) => (this.fileInput = fileInput)}
          style={{ display: 'none' }}
          onChange={this.handleFileUpload}
        />
        <button 
          onClick={() => this.fileInput.click()}
        >
          <div className='flex '>
          <img src={uploadIcon} alt="Upload File" className="mr-2" style={{ width: '28px', height: '28px' }} />
           <p className='mt-2 underline text-md flex '>Upload File<p className='text-red-600'>*</p></p>
          </div>
        </button>
      </div>
    );
  }
}

export default FileUpload;
