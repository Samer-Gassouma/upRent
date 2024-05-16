"use client"
import GoogleAddressSearch from "@/app/_compoenets/seeker/GoogleAddressSearch";
import { Button } from  "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from 'react'
import {Loader}  from 'lucide-react';
import { useRouter } from 'next/navigation'

async function AddNewproposal() {
    const [selectedAddress, setSelectedAddress] = useState<{ label: string; value: string; } | null[]>([])
    const [coordinates, setCoordinates] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    const nextHandler = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('proposal')
                .insert([
                    {
                        address: Array.isArray(selectedAddress) ? '' : selectedAddress?.label || '',
                        coordinates: coordinates,
                        createdBy: user?.id
                    }
                ])
                .select()

            if (data) {
                
                router.replace('/edit-proposal/' + data[0].id)
            }
            if (error) {
                console.log(error)
                
            }
        }
        catch (e) {
            console.log(e)
           
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <div className='mt-10 md:mx-56 lg-mx-80' >
            <div className='p-10 flex flex-col gap-5 items-center justify-center'>
                <h2 className='font-bold  text-2xl'> Add New proposal</h2>
                <div className='p-5 rounded-lg border shadow-md flex flex-col gap-5 w-full bg-gray-900'>
                    <h2 className='text-gray-500'>Enter Address</h2>
                    <GoogleAddressSearch
                        selectedAddress={(value:any) => setSelectedAddress(value)}
                        setCoordinates={(value:any) => setCoordinates(value)}
                    />
                    <Button
                        disabled={!selectedAddress || !coordinates || loading}
                        onClick={nextHandler}
                    >
                        {loading && <Loader className='animate-spin' />}
                        {loading ? 'Adding...' : 'Add proposal'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddNewproposal