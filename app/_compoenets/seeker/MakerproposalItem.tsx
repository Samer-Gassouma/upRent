import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BedDouble, Bath, X } from 'lucide-react'
import  {Button}  from '@nextui-org/react'

function MakerproposalItem({ item, closeHandler } : {item: any, closeHandler: any}) {
  return (
    <div>
      <div className='  w-[150px] rounded-lg cursor-pointer'>
        <X
          onClick={() => { closeHandler() }}
        />
        <Image src={item.proposal_Images[0].url} alt='image' width={800} height={150}
          className='rounded-lg object-cover h-[120px] w-[150px]' />
        <div className='flex flex-col gap-2 p-2 bg-white'>
          <h2 className='text-xl font-bold'>
            {item.price} dt
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
              {item.bedroom}</span>
          </div>
          <Link href={`/view-proposal/${item.id}`}>
          <Button size='sm'>View More</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MakerproposalItem