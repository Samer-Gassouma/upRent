"use client"
import React, { useEffect, useState } from 'react'
import { Loader, Calendar } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RangeCalendar } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Textarea } from "@nextui-org/input"
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from "@/utils/supabase/client";
import { today, getLocalTimeZone, DateFormatter } from '@internationalized/date';


function EditRecord({ params }: { params: any }) {

    const router = useRouter()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isFormValid, setIsFormValid] = useState(false);
    const [newstartDate, setStartDate] = useState<Date>(new Date());
    const [newendDate, setEndDate] = useState<Date>(new Date());

    const supabase = createClient()
    

    const cites = [
        'Béja',
        'Ben Arous',
        'Bizerte',
        'Gabès',
        'Gafsa',
        'Jendouba',
        'Kairouan',
        'Kasserine',
        'Kebili',
        'Kef',
        'Mahdia',
        'Manouba',
        'Medenine',
        'Monastir',
        'Nabeul',
        'Sfax',
        'Sidi Bouzid',
        'Siliana',
        'Sousse',
        'Tataouine',
        'Tozeur',
        'Tunis',
        'Zaghouan',
    ];    





    const handleDateRangeChange = (date: any) => {

        const startDate = new Date(date.start);
        const endDate = new Date(date.end);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        setStartDate(startDate);
        setEndDate(endDate);
        
        console.log('Start Date:', newstartDate)
        console.log('End Date:', newendDate);

    };

    const initialValues = {
        title: '',
        description: '',
        governorat: '',
        startDate: newstartDate,
        endDate: newendDate,
        furnished: true,
        terrace: true,
        parking: true,
        garden: true,
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        governorat: Yup.string().required('Required'),
        startDate: Yup.date().required('Required'),
        endDate: Yup.date().required('Required'),
    });

    const handleSubmit = async (values: any) => {
        console.log('Form Values:', values);
        const { data, error } = await supabase
            .from('record')
            .update(values)
            .eq('id', params.id)
            .select();


        if (error) {
            console.log(error)
        }

        console.log('Data:', data);
    };




    return (
        <div className="flex items-center justify-center  ">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-6 rounded-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Create Your Post
                    </h2>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
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

                        <Form className="mt-8 space-y-6">
                            <div className='flex flex-col gap-5'>
                                <div className='' >
                                    <label>Title</label>
                                    <Input
                                        name='title'

                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div >
                                    <label>Description</label>
                                    <Textarea
                                        name='description'

                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Governorat</span>
                                </label>
                                <Field
                                    as="select"
                                    className="select select-bordered"
                                    name="governorat"
                                >
                                    <option value="">Select Governorat</option>
                                    {cites.map((option) => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="governorat" className="text-red-500" />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Date Range</span>
                                </label>

                                <Field
                                    name="DateRange" 
                                    component={RangeCalendar}
                                    onChange={handleDateRangeChange}
                                />
                                <ErrorMessage className="text-red-500" name="DateRange" />
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="label cursor-pointer">
                                    <span className="label-text mr-7">Furnished</span>
                                    <Field
                                        type="radio"
                                        name="furnished"
                                        className="radio checked:bg-blue-500"
                                        value='true'
                                        checked
                                    />
                                </label>
                                <label className="label cursor-pointer">
                                    <span className="label-text mr-3">Unfurnished</span>
                                    <Field
                                        type="radio"
                                        name="furnished"
                                        className="radio checked:bg-blue-500"
                                        value='false'
                                    />
                                </label>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap gap-4">
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text mr-8">Terrace</span>
                                            <Field
                                                type="checkbox"
                                                name="terrace"
                                                defaultChecked
                                                className="checkbox checkbox-primary"
                                            />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text mr-8">Parking</span>
                                            <Field
                                                type="checkbox"
                                                name="parking"
                                                defaultChecked
                                                className="checkbox checkbox-primary"
                                            />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text mr-8">Jardin</span>
                                            <Field
                                                type="checkbox"
                                                name="garden"
                                                defaultChecked
                                                className="checkbox checkbox-primary"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isSubmitting
                                        ? 'bg-indigo-600 hover:bg-indigo-700'
                                        : 'bg-indigo-300'
                                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default EditRecord