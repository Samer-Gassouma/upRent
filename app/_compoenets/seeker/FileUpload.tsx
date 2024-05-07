"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

function FileUpload({setImages,imageList} : {setImages: any, imageList: any}) {

    const [imagePrview, setImagePreview] = useState<string[]>([]) // Add type annotation for imagePrview
    const handleFileUpload = (e : any) => {
        const files = e.target.files
        setImages(files)
        const Prview = Array.from(files).map((file : any) => URL.createObjectURL(file))
        setImagePreview((prevImages) => [...prevImages, ...Prview]) // Use spread operator to concatenate arrays
    }

    return (
        <div>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" multiple type="file" className="hidden" onChange={handleFileUpload}  accept="image/png, image/jpeg, image/jpg, image/gif" />
                </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {imagePrview.map((image,index) => (
                    <div key={index} className="relative w-full h-40 ">
                        <Image src={image} alt="image" width={100} height={100}  layout="responsive" className="object-cover
                            rounded-lg h-[100px] w-[100px]
                        " />
                        <button className="w-full mt-2 text-sm text-red-500 dark:text-red-400" 
                        onClick={() => {
                            URL.revokeObjectURL(image)
                            setImagePreview((prevImages) => prevImages.filter((item) => item !== image))
                        }
                        }
                        >Remove</button>
                        </div>
                ))}
                </div>
                {imageList && imageList.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {imageList.map((image: { url: string | StaticImport },index : number) => (
                    <div key={index} className="relative w-full h-80 ">
                        <Image src={image?.url} alt="image"  
                        width={250} height={250}  layout="responsive"
                        className="object-cover 
                            rounded-lg h-[250px] w-[250px] sm:h-[200px] sm:w-[200px] 
                        " />
                        
                        </div>
                ))}
                </div>
                )}
        </div>
    )
}

export default FileUpload