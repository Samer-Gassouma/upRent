'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function CreateSeeker(formData: FormData) {

  const supabase = createClient()

  const other_data = {
    cin: formData.get('cin') as string,
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
  }
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const {data: user, error} = await supabase.auth.signUp(data)

  if (user) {
    const { error } = await supabase.from('users').insert([{...other_data, user_id: user?.user?.id, role: 'seeker'}])

    if (error) {
      redirect("/register/Seeker?message=Could not authenticate user");
    }
  }

  if (error) {
    redirect("/register/Seeker?message=Could not authenticate user");
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

