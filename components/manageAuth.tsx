"use server"
import { createClient } from "@/utils/supabase/server";

export default async function manageAuth() {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()
    let role = null
    let { data: users, error } = await supabase.from('users').select('*').eq('user_id', user?.id)
    if (users) {
        role = users[0].role
    }
    return { role, user }


}
