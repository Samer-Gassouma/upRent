'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  let { data: { user } } = await supabase.auth.getUser()

  let { data: users, error:user_error } = await supabase
  .from('users')
  .select('*')
  .eq('user_id', user?.id)

  if (user_error) {
    redirect("/login?message=Could not authenticate user");
  }

  if (users && users[0].verified === false) {
    redirect("/register/cin_verify")
  }

  
  revalidatePath('/', 'layout')
  redirect('/')
}

