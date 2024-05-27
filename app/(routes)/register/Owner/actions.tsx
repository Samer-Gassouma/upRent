'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function CreateOwner(formData: FormData) {
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
    const { error } = await supabase.from('users').insert([{...other_data, user_id: user?.user?.id, role: 'landlord'}])

    if (error) {
      redirect("/register/Owner?message=Could not authenticate user");
    }

    const {data : pointData, error: pointError} = await supabase.from('ConnectPoint').insert([{user_id: user?.user?.id, points: 30}])

    if (pointError) {
      redirect("/register/Owner?message=Could not authenticate user");
      console.log(pointError)
    }

  }

  if (error) {
    redirect("/register/Owner?message=Could not authenticate user");
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

