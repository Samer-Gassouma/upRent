"use client"
import React, { useEffect, useState } from 'react'
import { Loader } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { Input, Textarea } from "@nextui-org/input"
import { Formik } from 'formik'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from "@/utils/supabase/client";



function EditRecord({ params }: { params: any }) {

    const router = useRouter()
    const [Record, setRecord] = useState([] as any)
    const [loading, setLoading] = useState(false)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        checkRecord()
    }, [])

    const supabase = createClient()

    const checkRecord = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
            .from('record')
            .select('*')
            .eq('id', params.id)
            .eq('createdBy', user?.id)

        if (data) {
            setRecord(data[0])
        }

        if ((data?.length ?? 0) <= 0) {
            router.replace('/')
        }
    }
    const onSubmitHandler = async (values:any) => {
        try {
            setLoading(true)

            const { data, error } = await supabase
                .from('record')
                .update(values)
                .eq('id', params.id)
                .select();

          
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

    const handleBtnSubmit = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('Record')
            .update({ active: true })
            .eq('id', params.id)
            .select();


        if (data) {
            console.log(data)
        }
        if (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <div className='px-10 md:px-36 my-10'>
            <h2 className='font-bold text-2xl'> Provide More Details About Your Post</h2>
            <Formik initialValues={{
                title: Record?.title,
                description: Record?.description,
            }}
                onSubmit={(values) => {
                    onSubmitHandler(values)
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
                            <div className='flex flex-col gap-5'>
                                <div className='' >
                                    <label>Title</label>
                                    <Input
                                        name='title'
                                        defaultValue={Record?.title}
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div >
                                    <label>Description</label>
                                    <Textarea
                                        name='description'
                                        defaultValue={Record?.description}
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center pt-8 gap-5'>
                                <Button color="primary" type='submit' onClick={onSubmitHandler} >
                                    {loading ? <Loader className='animate-spin' /> : 'Publish'}
                                </Button>

                                <Button  onPress={onOpen}
                                    className=' px-8 py-2 rounded-md ml-4 hover:bg-gray-300'>Save</Button>

                                <Modal
                                    backdrop="opaque"
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                    classNames={{
                                        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                                    }}
                                >
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Are you absolutely sure?</ModalHeader>
                                                <ModalBody>
                                                    <p>
                                                        Do u Really want to Publish this Record?

                                                    </p>

                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                    <Button color="primary" onClick={() => {
                                                        onSubmitHandler
                                                    }}  >
                                                        {loading ? <Loader className='animate-spin' /> : 'Publish'}

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

export default EditRecord