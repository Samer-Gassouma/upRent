"use client"
import { Formik } from 'formik'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from "@/utils/supabase/client";
import React, { useState } from 'react'
import FileUpload from '@/app/_compoenets/seeker/FileUpload';
import { Loader } from 'lucide-react'
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

async function Editproposal({ params }: { params: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()

    const property_types = [
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
        { value: 'office', label: 'Office' },
        { value: 'shop', label: 'Shop' },
    ]



    return (
        <div className='px-10 md:px-36 my-10'>
            <h2 className='font-bold text-2xl'> Provide More Details About Your proposal</h2>
            <Formik initialValues={{
                propertyType: '',
                bedroom: '',
                bathroom: '',
                area: '',
                price: '',
                description: '',
                profileImage: user?.email,
                fullname: user?.email,
                record_id: 4
            }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>

                        <div className='p-8 rounded-lg shadow-md '>

                            <div className='flex flex-col gap-2 pt-8 '>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="bedroom" className='text-lg font-semibold'>Bedroom</label>
                                        <Input type="text" label="Bedroom" name="bedroom" value={values.bedroom} onChange={handleChange} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="bathroom" className='text-lg font-semibold'>Bathroom</label>
                                        <Input type="text" label="Bathroom" name="bathroom" value={values.bathroom} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="area" className='text-lg font-semibold'>area</label>
                                        <Input type="text" label="area" name="area" value={values.area} onChange={handleChange} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="price" className='text-lg font-semibold'>monthly rent</label>
                                        <Input type="text" label="price" name="price" value={values.price} onChange={handleChange} />
                                    </div>
                                </div>



                                <div className='flex flex-col grid-cols-1 gap-2'>
                                    <label htmlFor="description" className='text-lg font-semibold'>Description</label>
                                    <Textarea
                                        name='description' value={values.description} onChange={handleChange} placeholder="Type your message here." />
                                </div>
                                <div className='flex flex-col gap-2 mt-4'>
                                    <h2 className='text-lg font-semibold'>Property Type</h2>
                                    <Select
                                        items={property_types}
                                        label="Select a property type"
                                        placeholder="Select a type"
                                        className="max-w-xs"
                                    >
                                        {(property_types) => <SelectItem key={property_types.value}>{property_types.label}</SelectItem>}
                                    </Select>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 pt-8'>
                                <h2 className='text-lg font-semibold'>Upload Property Images</h2>
                                <FileUpload
                                    imageList={[]}
                                    setImages={(value : any) => console.log(value)}
                                />
                            </div>
                            <div className='flex justify-center pt-8 gap-5'>
                                <Button onPress={onOpen} variant="light" className='bg-gradient-to-r from-[#ff8a00] to-[#e52e71]'>
                                    Publish
                                </Button>
                                <Modal
                                    backdrop="opaque"
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                    classNames={{
                                        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 dark:from-zinc-900 dark:to-zinc-900/10",
                                    }}
                                >
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Are you absolutely sure?</ModalHeader>
                                                <ModalBody>
                                                    <p>
                                                        Do u Really want to Publish this proposal?
                                                    </p>

                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                    <Button color="primary"  >
                                                        Publish
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>


                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Editproposal