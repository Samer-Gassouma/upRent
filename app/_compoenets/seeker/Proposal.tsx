"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BedDouble, Bath, Ruler, Search } from 'lucide-react'
import GoogleAddressSearch from './GoogleAddressSearch'

function Proposal({ proposals, handleSeach, searchAddress } : {proposals: any, handleSeach: any, searchAddress: any}) {
    const [address, setAddress] = useState<any>();
    return (
        <div>
            <div className='p-3 flex gap-6'>
                <GoogleAddressSearch
                    selectedAddress={(address : any) => { searchAddress(address); setAddress(address) } } setCoordinates={undefined}                />
                <button onClick={handleSeach} className='flex gap-2 ' color='primary'>
                    <Search className='w-4 h-4' /> Search
                </button>
            </div>
            {address && <div className='px-3 '>
                <h2 className='text-lg'>Found {proposals.length} proposals for <span className='text-primary font-bold' >{address?.label}</span> </h2>
            </div>}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {proposals.map((item :any, index : number) => (
                    <Link href={`/view-proposal/${item.id}`} key={index}>
                        <div className='p-3 hover:border-primary border border-gray-100 rounded-lg gap-4'>
                            <Image src={item.proposal_Images[0].url} alt={item.id} width={800} height={150}
                                className='rounded-lg object-cover h-[150px]' />
                            <div className='flex flex-col mt-2 gap-2'>
                                <h2 className='text-xl font-bold'>
                                    {item.price} dt / month
                                </h2>
                                <h2 className='flex gap-2 text-sm items-center'>
                                    <MapPin className='w-4 h-4' />
                                    {item.address}
                                </h2>
                                <div className='flex gap-2 mt-2 justify-between'>
                                    <span className='flex w-full gap-2 text-sm bg-gray-100 p-2 rounded-lg  text-gray-500 items-center justify-center'>
                                        <BedDouble className='w-4 h-4' />
                                        {item.bedroom}</span>
                                    <span className='flex w-full gap-2 text-sm bg-gray-100 p-2 rounded-lg  text-gray-500 items-center justify-center'>
                                        <Bath className='w-4 h-4' />
                                        {item.bathroom}</span>
                                    <span className='flex w-full gap-2 text-sm bg-gray-100 p-2 rounded-lg  text-gray-500 items-center justify-center'>
                                        <Ruler className='w-4 h-4' />
                                        {item.area}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default Proposal