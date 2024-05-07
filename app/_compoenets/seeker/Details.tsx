import React from 'react'
import { MapPin, Home, Car, Bath, Bed, Grid2X2, Hammer } from 'lucide-react'
import { Button } from '@nextui-org/react'
import MapSection from "@/app/_compoenets/seeker/MapSection";
function Details({ proposal } : {proposal: any}) {
    return (
        <div className='my-6 flex gap-2 flex-col '>
            <div className='flex justify-between items-center'>
                <div >
                    <h1 className='text-3xl font-bold'>Price Offre : {proposal?.price} dt</h1>
                    <h1 className='text-gray-500 text-lg flex gap-2'> <MapPin /> {proposal?.address} </h1>
                </div>
                <div>
                    <Button className='flex gap-2'>Contact</Button>
                </div>

            </div>
            <hr></hr>

            <div className='mt-4 flex flex-col gap-3'>
                <h1 className='text-2xl font-bold'>Features</h1>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='flex gap-2 items-center justify-center border p-2 rounded-lg text-primary bg-primary-light bg-purple-200'>
                        <Home />
                        <span>{proposal?.propertyType} </span>
                    </div>

                    <div className='flex gap-2 items-center justify-center border p-2 rounded-lg text-primary bg-primary-light bg-purple-200'>
                        <Grid2X2 />
                        <span>{proposal?.area} </span>
                    </div>
                    <div className='flex gap-2 items-center justify-center border p-2 rounded-lg text-primary bg-primary-light bg-purple-200'>
                        <Bed />

                        <span>{proposal?.bedroom} </span>
                    </div>
                    <div className='flex gap-2 items-center justify-center border p-2 rounded-lg text-primary bg-primary-light bg-purple-200'>
                        <Bath />
                        <span>{proposal?.bathroom} </span>
                    </div>
                </div>
            </div>

            <div className='mt-4'>
                <h1 className='text-2xl font-bold'>Description</h1>
                <p className='text-gray-500 mt-2'>{proposal?.description}</p>
            </div>

            <div className='mt-4'>
                <h1 className='text-2xl font-bold'>Location</h1>
                <MapSection proposals={[proposal]} />
            </div>
        </div>
    )
}

export default Details