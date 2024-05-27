import React from 'react'
import '@/styles/loader.css'
export default function loading() {
    return (
        <div className='flex justify-center items-center'>
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div >
    )
}
