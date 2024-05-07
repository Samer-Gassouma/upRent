"use client"

import React, { useEffect, useState, useCallback } from 'react';

import Modal_ from './Model';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import { Chip } from "@nextui-org/chip";

const ITEMS_PER_PAGE = 6;

export default function Requests() {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const companiesData = [
    {
      id: 1,
      name: 'Company 1',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 2,
      name: 'Company 2',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 3,
      name: 'Company 3',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 4,
      name: 'Company 4',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 5,
      name: 'Company 5',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 6,
      name: 'Company 6',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 7,
      name: 'Company 7',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 8,
      name: 'Company 8',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 9,
      name: 'ASASASS',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 10,
      name: 'XZCXZCX',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 11,
      name: 'Company 11',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 12,
      name: 'Company 12',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 13,
      name: 'Company 13',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 14,
      name: 'Company 14',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 15,
      name: 'Company 15',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 16,
      name: 'Company 16',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },
    {
      id: 17,
      name: 'Company 17',
      logo: 'https://via.placeholder.com/150',
      status: 'Pending',
      date: '2021-08-01',
    },


  ]


  const company = {
    companyName: 'Company Name',
    firstName: 'First Name',
    lastName: 'Last Name',
    nationalId: '1234567890',
    email: 'mail@gmail.com',
    logoUrl: 'https://github.com/shadcn.png',
    proofOfOwnershipUrl: 'https://github.com/shadcn.png',
    location: 'Location',
    city: 'City',
    country: 'Country',
    zipCode: 'Zip Code',
    website: 'Website',
  };




  const totalPages = Math.ceil(companiesData.length / ITEMS_PER_PAGE);

  const sortedCompanies = [...companiesData].sort((a, b) => {
    if (a.name < b.name) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a.name > b.name) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredCompanies = sortedCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  return (

    <div className=" mx-auto p-6  h-screen">
      <div className="flex flex-col gap-6 bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Company Requests</h1>

        <div className="search-and-sort bg-gray-800 p-4 rounded-lg mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          />

          <div className="flex items-center gap-4 mt-4 justify-between text-default-600">
            <select onChange={handleStatusChange} value={selectedStatus} className="p-2 border  rounded-md">
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              onClick={handleSortChange}
              className="bg-blue-500 hover:bg-blue-700 text-gray-900 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sort by Name ({sortDirection})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((company) => (
            
            <Card className="max-w-[340px]" onPress={onOpen} key={company.id}>
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <Avatar isBordered radius="full" size="md" src={company.logo} alt="Company Logo" />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h5 className="text-small tracking-tight ">{company.name}</h5>
                  </div>
                </div>

                <Chip color={company.status === 'Pending' ? 'warning' : company.status === 'Approved' ? 'success' : 'danger'}>{company.status}</Chip>

              </CardHeader>
              <CardBody className="px-3 py-0 text-small ">
                <p className="text-sm">Date: {company.date}</p>
              </CardBody>
              <CardFooter className="gap-3">
                <Button
                  className="bg-transparent text-foreground border-default-200"
                  color="primary"
                  radius="full"
                  size="sm"
                  variant="bordered"
                  onPress={onOpen}
                >
                  View More
                </Button>

              </CardFooter>
            </Card>
          ))}

          <Modal_ company={company}  isOpen={isOpen} onOpenChange={onOpenChange} />

        </div>

        <div className="flex justify-between">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Previous
          </button>
          <p>Page {currentPage} of {totalPages}</p>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        </div>
      </div>
    </div>

  )
}
