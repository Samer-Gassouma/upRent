"use client"
import React, { useEffect, useState, useCallback } from 'react';

import { Card } from '@tremor/react';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link';
import Requests from '@/app/_compoenets/admin/Requests/page';
import loading  from '@/app/loading';

interface DashboardStats {
  users: number;
  seekers: number;
  renters: number;
  companies: number;
}

const Badge = ({ percentage }: { percentage: number }) => {
    const isPositive = percentage > 0
    const isNeutral = percentage === 0
    const isNegative = percentage < 0
  
    if (isNaN(percentage)) return null
  
    const positiveClassname = 'bg-green-900/25 text-green-400 ring-green-400/25'
    const neutralClassname = 'bg-zinc-900/25 text-zinc-400 ring-zinc-400/25'
    const negativeClassname = 'bg-red-900/25 text-red-400 ring-red-400/25'
  
    return (
      <span
        className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
          isPositive
            ? positiveClassname
            : isNeutral
            ? neutralClassname
            : negativeClassname
        }`}>
        {isPositive ? <ArrowUpRight className='h-3 w-3' /> : null}
        {isNeutral ? <ArrowRight className='h-3 w-3' /> : null}
        {isNegative ? <ArrowDownRight className='h-3 w-3' /> : null}
        {percentage.toFixed(0)}%
      </span>
    )
  }

const DashboardPage = () => {
    const [stats, setStats] = useState<DashboardStats>({ users: 0, seekers: 0, renters: 0, companies: 0 });

    const [loader, setloader] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    }

    const fetchStats = useCallback(async (searchTerm = '') => {
      setloader(false);
      setError(null);
      try {
        const response:any
         = await new Promise((resolve, reject) => {
          setTimeout(() => resolve({ users: 100, seekers: 50, renters: 30, companies: 20 }), 2000);
        });
        setStats(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setloader(false);
      }
    }, []);
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (searchTerm) {
      fetchStats(searchTerm);
    }
  }, [searchTerm, fetchStats]);

  if (loader) {
    return <div className="flex justify-center items-center h-screen">{loading()}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
    }
    
  return (
    <div className="p-4 bg-gray-800 h-screen text-white">
      <h1 className="text-3xl mb-4 text-center">
        <span className="text-cyan-500">UpRent</span> Dashboard
        </h1>
        <div className="flex justify-center items-center mb-4">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e)}
                className="p-2 w-1/2 rounded-lg border-none bg-gray-900 text-white 
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-gray-900"
            />
            
        </div>


      <div className=' w-full py-12 mt-6 flex justify-center items-center'>
      <div className='relative w-full max-w-6xl mx-auto text-white'>
        <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg'></div>
        <div className='relative p-12 bg-gray-800 shadow-lg sm:rounded-lg'>
          <h2 className='text-3xl font-semibold text-center'>Welcome to UpRent Dashboard</h2>
          <div className='mt-4 text-lg text-center'>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
            <Link href="/admin/users">
        <Card className='w-full hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-cyan-900'>
        <p className='flex gap-2.5 items-center text-tremor-default text-dark-tremor-content '>
            Users
            <Badge
              percentage={
                (stats.users / Number(stats.users) - 1) * 100
              }
            />
          </p>
          <div className='text-3xl text-dark-tremor-content-strong font-semibold'>
            {stats.users === 0 ? loading(): stats.users}
          </div>
        </Card>
        </Link>
        <Link href="/admin/users">

        <Card className='w-full hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-cyan-900'>
          <p className='text-tremor-default text-dark-tremor-content'>
            Seekers
          </p>
          <div className='text-3xl text-dark-tremor-content-strong font-semibold'>
            {stats.seekers === 0 ? loading(): stats.seekers}
          </div>
        </Card>
        </Link>

        <Link href="/admin/users">

        <Card className='w-full hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-cyan-900'>
          <p className='text-tremor-default text-dark-tremor-content'>
            Renters
          </p>
          <div className='text-3xl text-dark-tremor-content-strong font-semibold'>
            {stats.renters === 0 ? loading(): stats.renters}
          </div>
        </Card>
        </Link>
        <Link href="/admin/users">

        <Card className='w-full hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-cyan-900'>
          <p className='text-tremor-default text-dark-tremor-content'>
            Companies
          </p>
          <div className='text-3xl text-dark-tremor-content-strong font-semibold'>
            {stats.companies === 0 ? loading(): stats.companies}
          </div>
        </Card>
        </Link>
      </div>
          </div>
        </div>
      </div>
    </div>

          <div className='w-full py-12 mt-6 flex justify-center items-center bg-gray-800'>
      <div className='relative w-full max-w-6xl mx-auto text-white'>
        <Card className='w-full hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-cyan-900' onClick={()=>document.getElementById('RequestsModel').showModal()}>
          <div className='p-12 bg-gray-800 shadow-lg sm:rounded-lg'>
            <h2 className='text-3xl font-semibold text-center'>Recent Requests</h2>
            <div className='mt-4 text-lg text-center'>
              <p>View all the recent requests from the Companies</p>
            </div>
          </div>
        </Card>
              
              <Requests />
        </div>
        </div>

    </div>
  );
};

export default DashboardPage;