import React from 'react'
import { MapPin, Sofa, Car, Fence, SquareParking, Grid2X2, Hammer } from 'lucide-react'
import { Button } from '@nextui-org/react'
import { fetchPostDetails } from '@/app/_compoenets/landlord/fetchPosts';
import Link from 'next/link';

export default async function page({ params }: { params: any }) {
    const { id } = params;
    const data = await fetchPostDetails(id);
    if (!data) return <div>Loading...</div>
    const post = data[0];
    return (
        <div className='my-6 flex gap-2 flex-col '>
            <div className='flex justify-between items-center'>
                <div>
                    <div className='flex gap-2 items-center'>
                        <h1 className='text-3xl font-bold'>Start Date: {post?.startDate}</h1> TO <h1 className='text-3xl font-bold'>End Date: {post?.endDate}</h1>
                    </div>
                    <h1 className='text-gray-500 text-lg flex gap-2'> <MapPin /> {post?.address} / {post?.governorat}</h1>
                </div>
                <Link href={`/proposal/new/${id}`}>
                    <Button className='flex gap-2'>Create Proposal</Button>
                </Link>

            </div>
            <hr></hr>
            <div className='mt-4 flex flex-col gap-3'>
                <h1 className='text-2xl font-bold'>Features</h1>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='flex gap-2 items-center justify-center border p-2 rounded-lg text-primary bg-primary-light bg-purple-200'>
                        <Sofa />
                        <span>{post?.furnished ? 'Furnished' : 'Not Furnished'} </span>
                    </div>

                    <div className='flex gap-2 items-center justify-center border p-2 rounded-lg text-primary bg-primary-light bg-purple-200'>
                        <Grid2X2 />
                        <span>{post?.terrace ? 'Terrace' : 'No Terrace'} </span>
                    </div>
                    <div className='flex gap-2 items-center justify-center border p-2 rounded-lg text-primary bg-primary-light bg-purple-200'>
                        <SquareParking />

                        <span>{post?.parking ? 'Parking' : 'No Parking'} </span>
                    </div>
                    <div className='flex gap-2 items-center justify-center border p-2 rounded-lg text-primary bg-primary-light bg-purple-200'>
                        <Fence />
                        <span>{post?.garden ? 'Garden' : 'No Garden'} </span>
                    </div>
                </div>
            </div>

            <div className='mt-4'>
                <h1 className='text-2xl font-bold'>Description</h1>
                <p className='text-gray-500 mt-2'>{post?.description}</p>
            </div>


        </div>
    )
}

