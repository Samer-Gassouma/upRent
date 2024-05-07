
import Link from 'next/link'
import React from 'react'
export default function register() {
  
  return (
    <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-3xl w-full space-y-8">
            <h1 className="text-3xl font-extrabold text-white text-center">
                Choose your Account Type :
            </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-indigo-600 text-white text-center py-12 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Link href='/register/Seeker' className="text-2xl font-extrabold">Seeker</Link>
          </button>
          <button className="bg-indigo-600 text-white text-center py-12 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Link href='/register/Owner'  className="text-2xl font-extrabold">Owner</Link>
          </button>
        </div>
        <div className="text-center">
            <Link href="/register/Company" className="text-white text-md font-medium
            hover:text-indigo-500">
                are you a company? click here
            </Link>
        </div>
      </div>
    </div>
  )
}