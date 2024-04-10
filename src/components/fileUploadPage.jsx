import { useState } from "react";
import FileUpload from "./fileUpload";
import ChatWindow from "./ChatWindow";
import Loader1 from "./Loader1/Loader1";

const FileUploadPage = ({ messages, sendMessage, setUrl }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleFileUploadSuccess = () => {
    setIsLoading(false); 
    setFileUploaded(true);
  };

  const handleFileUploadStart = () => {
    setIsLoading(true); // Turn on loader
  };

  const { filename, session_id } = localStorage;
  console.log(filename, session_id);
  console.log(localStorage.filename);
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center">
        {/* <div className="flex flex-col"> */}
          <h2 className="text-3xl font-bold mb-3 ml-40 mr-3">
            Upload File and Query
          </h2>
          <div className="flex flex-col items-center w-full">
            <FileUpload
              onSuccess={handleFileUploadSuccess}
              onStart={handleFileUploadStart}
            />
          {filename != null && <h3> <b>Uploaded file</b> : {filename}</h3>}
            <ChatWindow messages={messages} sendMessage={sendMessage} />
          </div>
        {/* </div> */}
        {isLoading && (
          <div className="flex flex-col items-center mt-8">
            <Loader1 />
            <p className="mt-2">Uploading...</p>
          </div>
        )}
        {fileUploaded && (
          <div>
            {setUrl(
              `http://127.0.0.1:8000/api/v1/query/pdf/${filename}/1/${session_id}`
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadPage;
