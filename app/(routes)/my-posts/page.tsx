import fetchPostsByUser from "@/app/_compoenets/seeker/fetchPosts";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { Calendar, MapPin, DiamondIcon } from 'lucide-react';

export default async function seeker() {
    const posts = await fetchPostsByUser() || [];

    return (
        <div className="container mx-auto px-4  ">
           
            {posts.length === 0 && (
                <div className="flex justify-center items-center h-[50vh]">
                    <DiamondIcon size={48} />
                    <p className="text-lg text-gray-500 dark:text-gray-300">
                        You have not created any posts yet.
                    </p>
                </div>
            )}
            {/* if there are no posts, display a message */ } 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                    <Card className="max-w-[340px] hover:shadow-lg hover:border-primary-500 transition-all ease-in-out duration-300"
                        key={post.id}>
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">

                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">
                                        {post.title}
                                    </h4>
                                </div>
                            </div>
                            <Link href={`/post/${post.id}`}>
                                <Button
                                    className={"bg-transparent text-foreground border-default-200"}
                                    color="primary"
                                    radius="full"
                                    size="sm"
                                    variant={"bordered"}
                                >
                                    Read More
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardBody className="px-3 py-0 text-small text-default-400 flex justify-between items-center flex-row">
                            <p className="text-default-500">
                                {post.description && post.description.length > 25 ? post.description.slice(0, 25) + "..." : post.description}
                            </p>
                            <span className="text-default-500 flex items-center">
                                <Calendar className="mr-2 text-gray-500 " size={18} />
                                {post.created_at.split("T")[0]}
                            </span>

                        </CardBody>
                        <CardFooter className="gap-3">

                            <div className="flex gap-1">

                                <p className="font-semibold text-default-400 text-small flex items-center">
                                    <MapPin className="mr-2 text-gray-500" size={18} />
                                    {post.address}
                                </p>

                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}