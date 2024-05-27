import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Spacer, Skeleton } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import fetchPosts from '@/app/_compoenets/landlord/fetchPosts';
import { MapPin } from 'lucide-react'

export default async function LandlordPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()
    const { data: point, error } = await supabase.from('ConnectPoint').select('points').eq('user_id', user?.id)
    const posts = await fetchPosts() || [];
    return (
        <div className="h-screen flex overflow-hidden">
            <div className="lg:fixed w-80 h-screen flex-start left-12 flex flex-col p-4 justify-between items-start">
                <Card className="max-w-[400px] shadow-md">
                    <CardHeader className="flex gap-3 items-center">
                        <div className='flex gap-3 items-center'>
                            <span className='bg-black p-2 rounded-medium'>
                                <p className='text-white'>{(user?.email ?? '')[0].toUpperCase()}{(user?.email ?? '')[1].toUpperCase()}</p>
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm">{user?.email}</p>
                        </div>
                        <div className="text-green-500">Available</div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex gap-3 justify-between">
                            <p className="text-md">Connect Points</p>
                            <p className="text-md">{point && point[0].points}</p>
                        </div>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link
                            href="#"
                        >
                            <Button color="success" >
                                Buy More Connect Points
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>

            <div className="pl-80 flex-grow">
                <div className="flex-grow p-4">
                    <h1 className="text-4xl font-bold md:text-2xl">Welcome Landlord</h1>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <div key={index}>
                                {point && point[0].points < 10 ?
                                    <>
                                        <CustomCard />
                                        
                                    </>
                                    :

                                    <Card className="shadow-md">
                                        <CardHeader>
                                            <div className="flex gap-3 items-center">
                                                <p className="font-semibold text-lg">{post.title}</p>
                                                <p className="text-sm">Posted on {post.created_at.split("T")[0]}</p>
                                            </div>
                                        </CardHeader>
                                        <CardBody className="flex gap-2 justify-between p-4">
                                            <div className="flex flex-col gap-2">
                                                <p>{post.description}</p>
                                                <div className="flex gap-2 items-center">
                                                    <MapPin size={18} />
                                                    <p>{post.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-end">
                                                {point && point[0].points < 10 ? <Button size="sm" color="danger" >Not Enough Points</Button> :

                                                    <Link href={`/post/details/${post.id}`}>
                                                        <Button size="sm" color="secondary" >View Details</Button>
                                                    </Link>
                                                }
                                            </div>
                                        </CardBody>
                                    </Card>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

const CustomCard = () => (
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
        </div>
        <Button size="sm" color="danger" >Not Enough Points</Button>
    </Card>
);
