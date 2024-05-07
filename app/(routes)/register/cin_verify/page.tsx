"use client"
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import axios from 'axios';

enum UploadStatus {
    Idle,
    Uploading,
    Success,
    Error
}


function IDVerificationPage() {
    const acceptedType = ['image/jpeg', 'image/png', 'image/jpg'];
    const [files, setFiles] = useState([] as File[]);
    const [uploadStatus, setUploadStatus] = useState(UploadStatus.Idle);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles: File[]) => [...prevFiles, ...acceptedFiles])
    }, [files]);

    const handleUpload = () => {

        const formData = new FormData();
        files.forEach(file => {
            formData.append('file', file);
        });
        if (files.length != 2 ) {
            setUploadStatus(UploadStatus.Error);
            return;
        }
        setUploadStatus(UploadStatus.Uploading);

        axios.post('/api/verify-id', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 0));
                setUploadProgress(percentCompleted);
            }
        })
        .then(response => {
            setUploadStatus(UploadStatus.Success);
        })
        .catch(error => {
            setUploadStatus(UploadStatus.Error);
        });
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-gray-900 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="block pl-2 font-semibold text-xl self-start ">
                                <h2 className="leading-relaxed">Verify National ID</h2>
                                {uploadStatus === UploadStatus.Uploading && (
                                    <div>
                                        <progress value={uploadProgress} max="100" />
                                        <p>{uploadProgress}%</p>
                                    </div>
                                )}
                                <p className="text-sm text-gray-500">Please upload a scanned copy of your national ID</p>
                                <div className='flex justify-center items-center mt-5'>
                                {files.map((file, index) => (
                                    <div key={index} className=" p-2">
                                        <Image key={index} src={URL.createObjectURL(file)} alt="ID Card" width={100} height={100} 
                                        className='rounded-lg shadow-lg cursor-pointer' 
                                         />
                                        <button 
                                        onClick={
                                            () => {
                                                const newFiles = files.filter((_, i) => i !== index);
                                                setFiles(newFiles);
                                            }
                                        
                                        }
                                        className="
                                        text-white px-2 py-1 rounded-md bg-red-500 ml-2 cursor-pointer
                                        ">Remove</button>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5" {...getRootProps()}>
                            <h2 className="text-lg font-semibold">Upload your ID</h2>
                            <Image src="/dropDown.png" alt="ID Card" width={100} height={100} />
                        </div>

                        <div {...getRootProps()}
                            className=" mt-5 flex justify-center items-center w-full text-white px-4 py-3
                            rounded-md focus:outline-none bg-black hover:bg-white hover:text-black hover:shadow-lg cursor-pointer">
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p className='
                    text-center font-bold'>Drop the files here ...</p> :
                                    <p className='text-center font-bold'>Drag and drop your ID here, or click to select files</p>
                            }
                        </div>
                        <button 
                        type="button"
                        onClick={handleUpload}
                        disabled={uploadStatus === UploadStatus.Uploading || files.length === 0}
                        className="flex justify-center items-center w-1/2 mt-5 text-white px-2 py-2 rounded-md focus:outline-none bg-blue-600 hover:bg-blue-600 hover:shadow-lg">
                            {uploadStatus === UploadStatus.Idle && "Upload"}
                            {uploadStatus === UploadStatus.Uploading && "Uploading..."}
                            {uploadStatus === UploadStatus.Success && "Success"}
                            {uploadStatus === UploadStatus.Error && "Error"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default IDVerificationPage;