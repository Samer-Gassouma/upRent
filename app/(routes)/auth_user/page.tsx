"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthUser() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()


    if (!user) {
        return redirect("/login?message=Please sign in to access this page")
    }


    let { data, error } = await supabase.from('users').select('*').eq('user_id', user.id)

    if (error || !data) {
        return redirect("/login?message=Could not authenticate user")
    }

    const userRole = data[0].role

    if (userRole === 'admin') {
        return redirect("/seeker")
    }

    if (userRole === 'user') {
        return redirect("/user")
    }





}
