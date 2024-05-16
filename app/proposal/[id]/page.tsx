import { fetch_proposals_by_Post } from "@/app/_compoenets/seeker/fetchPosts";
import { createClient } from "@/utils/supabase/server";
import { MapPin, BedDouble, Bath, Ruler, Search } from 'lucide-react'
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import Link from "next/link";
import MapSection from "@/app/_compoenets/seeker/MapSection";


export default async function page({ params }: { params: any }) {

    const supabase = createClient();
    const { data, error } = await supabase.from('record').select('*').eq('id', params.id);
    if (error) {
        console.error(error)
    }

    if (!data) {
        return(
            <div>
                loading...
            </div>
        )
    }
    const post = data[0] || null;
    const proposals = await fetch_proposals_by_Post(post.id) || [];

    return (
        <div className=' my-3 mx-4'>
            {post && (
                <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl font-semibold'>
                        Your Record : {post.title} <span className='text-gray-500' > at the address {post.address}</span> {' '}
                        <span className='text-gray-500'>created at {post.created_at.split('T')[0]}</span>
                    </h1>
                    {proposals.length > 0 && (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

                            <div className='fixed right-10 h-full md:w-[350px] lg:w-1/3'>
                                <MapSection proposals={proposals} />
                            </div>
                            <div className='flex flex-col gap-4'>
                                {proposals.map((proposal: any) => (
                                    <Link href={`/view-proposal/${proposal.id}`} key={proposal.id}>
                                        <Card
                                            isBlurred
                                            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                                            shadow="sm"
                                        >
                                            <CardBody>
                                                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                                    <div className="relative col-span-6 md:col-span-4">
                                                        <Image
                                                            alt="Album cover"
                                                            className="object-cover"
                                                            height={200}
                                                            shadow="md"
                                                            src={proposal.proposal_Images[0].url}
                                                            width="100%"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col col-span-6 md:col-span-8">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex flex-col gap-0">
                                                                <h3 className="font-semibold text-foreground/90 flex items-center gap-2"><MapPin size={16} />{proposal.address} </h3>
                                                                <p className="text-small text-foreground/80">{proposal.created_at.split('T')[0]}</p>

                                                            </div>
                                                            <span className="text-foreground/90">{proposal.price} dt / month</span>
                                                        </div>

                                                        <div className="flex gap-4 mt-4">

                                                            <div className="flex items-center gap-2">
                                                                <BedDouble size={16} />
                                                                <p className="text-small text-foreground/80">{proposal.bedroom}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Bath size={16} />
                                                                <p className="text-small text-foreground/80">{proposal.bathroom}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Ruler size={16} />
                                                                <p className="text-small text-foreground/80">{proposal.area}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    )}

                    {proposals.length === 0 && (
                        <div className='flex justify-center items-center'>
                            <h1 className='text-2xl font-semibold'>No proposals for this record</h1>
                        </div>
                    )}

                </div>
            )}
        </div>
    )
}
