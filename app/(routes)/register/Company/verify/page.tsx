"use client"
import Link from 'next/link';
import React, { useCallback,useState } from 'react';
import { useDropzone } from 'react-dropzone';

enum UploadStatus {
    Idle,
    Uploading,
    Success,
    Error
}

function FileUploadPage() {

    const [files, setFiles] = useState([] as any);
    const [uploadStatus, setUploadStatus] = useState(UploadStatus.Idle);

  const onDrop = useCallback((acceptedFiles : any) => {
    let file = acceptedFiles[0];
    setFiles(file);
  }, []);

  const handleUpload = () => {
    console.log(files);
    if(files.length === 0 ){
        setUploadStatus (UploadStatus.Error);
        return ;
    }
    setUploadStatus(UploadStatus.Uploading);
    const formData = new FormData();
    formData.append("file", files);
    fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setUploadStatus(UploadStatus.Success);
        } else {
          setUploadStatus(UploadStatus.Error);
        }
      })
      .catch(() => {
        setUploadStatus(UploadStatus.Error);
      });

  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (uploadStatus === UploadStatus.Success) {
    return (
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-gray-900 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-extrabold text-white text-center">File Uploaded Successfully</h1>
                    <p className="text-md mt-5 font-normal leading-relaxed">
                        Your Account will be verified soon , you will be notified by email
                    </p>
                    <span className="text-md text-gray-500 font-normal leading-relaxed mt-5 justify-center text-center">
                        Thank you for choosing us
                    </span>

                    <Link href="/">
                        <button className=" flex justify-center items-center w-1/2 mt-5 text-white px-2 py-2 rounded-md focus:outline-none bg-black hover:bg-white hover:text-black hover:shadow-lg">
                            <span className=' font-bold'>Go Back</span>
                            
                        </button>
                    </Link>
                    </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-gray-900 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start space-y-2 text-white">
                <h2 className="leading-relaxed">Upload Proof of Ownership</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">Upload a document that proves you own the company</p>
         
              </div>
            </div>
            <div {...getRootProps()} className="flex justify-center items-center mt-5 w-full text-white px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg">
              <input {...getInputProps()} />
              {files.length != 0 ? 
                    <p>File Uploaded: {files.name }</p> :
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag and drop some files here, or click to select files</p>
              }
              
            </div>
              
            <button 
            onClick={handleUpload}

            type="button" 
              
            disabled={uploadStatus === UploadStatus.Uploading || files.length === 0}
              
            className="flex justify-center items-center w-1/2 mt-5 text-white px-2 py-2 rounded-md focus:outline-none bg-blue-600 hover:bg-blue-600 hover:shadow-lg">
                {uploadStatus === UploadStatus.Idle && "Upload"}
                {uploadStatus === UploadStatus.Uploading && "Uploading..."}
                {uploadStatus === UploadStatus.Error && "Error"}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default FileUploadPage;