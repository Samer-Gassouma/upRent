import Link from 'next/link';
import { Input } from '@nextui-org/input';

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {login} from "./actions";

export default  function Login({
    searchParams,
  }: {
    searchParams: { message: string };
  }) {

    
    



  return (
    <div className=" flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-6 rounded-lg">
      {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" >
          <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm  space-y-4">
                <div>
                    <Input
                    type="email"
                    name="email"
                    id="email"
                    required
                    label="Email"

                    />
                </div>
                <div>
                    <Input
                    type="password"
                    name="password"
                    id="password"
                    required
                    label="password"
                    />
                </div>
            </div>

          <div>
            <button  type="submit" 
            formAction={login}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
              Sign in
            </button>
            
              <Link href="/register">
                <div className="mt-4 block text-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Create an account
                </div>
              </Link>

          </div>
        </form>
      </div>
    </div>
  );
}

  