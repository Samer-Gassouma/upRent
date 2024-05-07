"use client"
import { useState, useEffect } from "react";

import { Card, CardHeader } from "@nextui-org/react";
import { Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Code } from "@nextui-org/react";
import { Lock, Mails, CircleUser } from 'lucide-react';
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";


interface Employee {
    id: string;
    email: string;
    cin: string;
    first_name: string;
    last_name: string;
    company_id: string;
    company_email: string;
    user_id: string;
}

export default async function App({ params }: any) {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)


    const [mail_Model, setMail_Model] = useState(false);

    const supabase = createClient();
    const [Employees, setEmployees] = useState([] as Employee[])
    useEffect(() => {
        async function fetchEmployee() {
            let { data, error } = await supabase.from('employee').select('*').eq('company_id', params.id)
            setEmployees(data || [])
        }
        fetchEmployee()
    }, [])

    let { data: company, error } = await supabase.from('company').select('*').eq('id', params.id)
    if (error) {
        redirect('/login')
    }



    const handleAddEmployee = async (e: any) => {
        try {
            setLoading(true)
            e.preventDefault()

            let email = document.getElementById('email');
            let cin = document.getElementById('cin');
            let first_name = document.getElementById('first_name');
            let last_name = document.getElementById('last_name');
            let password = document.getElementById('password');
            let confirm_password = document.getElementById('confirm_password');

            const employee = {
                email: (email as HTMLInputElement)?.value,
                cin: (cin as HTMLInputElement)?.value,
                first_name: (first_name as HTMLInputElement)?.value,
                last_name: (last_name as HTMLInputElement)?.value,
                company_id: params.id,
                company_email: '',
                user_id: ''
            }

            if (password && confirm_password && (password as HTMLInputElement).value !== (confirm_password as HTMLInputElement).value) {
                setErrorMsg('Password does not match')
                return
            }
            let { data: company, error: company_error } = await supabase.from('company').select('*').eq('id', params.id)

            const company_email = company ? (first_name as HTMLInputElement)?.value + '.' + (last_name as HTMLInputElement)?.value + '@' + company[0].companyName + '.com' : ''

            let { data: user_data, error: user_error } = await supabase.auth.signUp({
                email: company_email,
                password: password ? (password as HTMLInputElement).value : ''
            })

            let { data: user, error: user_error2 } = await supabase.from('users').insert({
                user_id: user_data?.user?.id,
                role: 'landlord'
            })

            employee.user_id = user_data?.user?.id ?? '';
            employee.company_email = company_email

            let { data, error } = await supabase.from('employee').insert(employee)
            if (error) {
                setErrorMsg(error.message)
            }
            else {
                onClose()
                setMail_Model(true)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }

        mail_Model ? setMail_Model(false) : setMail_Model(true)
    }




    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
                <div className="flex  items-center px-8 py-4 gap-3">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <span className="text-gray-400">/</span>
                    <h2 className="text-xl font-semibold  text-indigo-800">
                        {company && company[0].companyName}
                    </h2>
                </div>
                <div className="flex justify-end px-8 py-4 ">
                    <Button className="bg-[#1E1E1E] text-white" onPress={onOpen}>Add new Employee</Button>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >

                <ModalContent>

                    {(onClose) => (
                        <form onSubmit={handleAddEmployee}>
                            <ModalHeader className="flex flex-col gap-1">
                                Add new Employee
                                <div className="flex justify-center items-center">
                                    <p className="text-red-500 font-bold">{errorMsg}</p>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    endContent={
                                        <Mails className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Email"
                                    placeholder="Enter your Email"
                                    variant="bordered"
                                    id="email"
                                />
                                <Input
                                    autoFocus
                                    endContent={
                                        <CircleUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Cin"
                                    placeholder="Enter your CIN"
                                    variant="bordered"
                                    id="cin"
                                />
                                <Input
                                    endContent={
                                        <CircleUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="First Name"
                                    placeholder="Enter your First Name"
                                    variant="bordered"
                                    id="first_name"
                                />
                                <Input
                                    endContent={
                                        <CircleUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Last Name"
                                    placeholder="Enter your Last Name"
                                    variant="bordered"
                                    id="last_name"
                                />
                                <Input
                                    endContent={
                                        <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                    id="password"
                                />
                                <Input
                                    endContent={
                                        <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Confirm Password"
                                    placeholder="Confirm your password"
                                    type="password"
                                    variant="bordered"
                                    id="confirm_password"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit" disabled={loading}>
                                    {loading ? <Spinner color="white" /> : 'Add Employee'}
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>

            <Modal isOpen={mail_Model} onOpenChange={() => setMail_Model(!mail_Model)}>
                <ModalContent>
                    <ModalHeader>Employee Added</ModalHeader>
                    <ModalBody>
                        <p>Employee has been added successfully</p>
                        <p>Employee will receive an email with the login credentials</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={
                            () => setMail_Model(!mail_Model)
                        }>
                            Close


                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
                <Card className="col-span-12 sm:col-span-4 h-[100px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny  uppercase font-bold">Number of Employees</p>
                        <h4 className="font-medium text-large">1000+</h4>
                    </CardHeader>

                </Card>
                <Card className="col-span-12 sm:col-span-4 h-[100px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny  uppercase font-bold">Number of Contractors</p>
                        <h4 className="font-medium text-large">1000+</h4>
                    </CardHeader>

                </Card>
                <Card className="col-span-12 sm:col-span-4 h-[100px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny  uppercase font-bold">Number of Employees</p>
                        <h4 className="font-medium text-large flex items-center">1000+<span className="text-xs text-gray-400 ml-2">+10%</span></h4>
                    </CardHeader>

                </Card>


            </div>

            <div className="p-4 md:p-8">
                <h1 className="text-2xl font-bold mb-4">Employee List</h1>
                <div className="overflow-x-auto">
                    {Employees.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <Spinner color="warning" />
                        </div>
                    ) : (
                        <table className="table-auto w-full text-left">
                            <thead className="border-b-2 border-gray-300">
                                <tr>
                                    <th className="px-4 py-3">CIN</th>
                                    <th className="px-4 py-3">First Name</th>
                                    <th className="px-4 py-3">Last Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Employees.map((employee: any) => (
                                    <tr key={employee.id} className="border-b border-gray-300 hover:bg-gray-900">
                                        <td className="px-4 py-3">{employee.cin}</td>
                                        <td className="px-4 py-3">{employee.first_name}</td>
                                        <td className="px-4 py-3">{employee.last_name}</td>
                                        <td className="px-4 py-3">{employee.email}</td>
                                        <td className="px-4 py-3">
                                            <Link href={`/Company/${params.id}/${employee.user_id}`}>
                                                <Button color="success" variant="flat">View</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

        </div>


    );
}
