import React from 'react';
import axios from 'axios'; // Import Axios
import fileIcon from '../assets/upload-file-svgrepo-com.svg';
import {useState} from 'react' // Import the SVG file


class FileUpload extends React.Component {
  // Function to handle file selection
  handleFileUpload = async (event) => {
    // const [loading, setLoading] = useState(true);
    const file = event.target.files[0]; // Get the selected file
    const formData = new FormData();

    formData.append('file', file);
    console.log('filename',file.name) // Append the file to the FormData object
    // localStorage.setItem('filename',file.name)
    try {
      if (this.props.onStart) {
        this.props.onStart(); // Call onStart callback if provided
        // setLoading(true)
      }

      const response = await axios.post('http://127.0.0.1:8000/api/v1/upload/pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
      console.log('File uploaded successfully:', response.data);
      localStorage.setItem('filename', response.data.filename);
      if (this.props.onSuccess) {
        this.props.onSuccess(); // Call onSuccess callback if provided
        // setLoading(false)
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
          <img src={fileIcon} alt="Upload File" className="mr-2" style={{ width: '34px', height: '34px' }} />
        </button>
        {/* {!loading && <Loader />} */}
      </div>
    );
  }
}

export default FileUpload;
