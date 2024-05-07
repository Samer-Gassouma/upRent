"use Server"
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();
export default async function fetchEmployee() {
    const { data: { user } } = await supabase.auth.getUser()
    let { data: employee, error } = await supabase.from('users').select('*');

    return employee
}

export async function addEmployee(employee: any) {
    let { data, error } = await supabase.from('employee').insert(employee)
    return data
}

