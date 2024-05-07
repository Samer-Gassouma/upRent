import "@/styles/globals.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()
    let role = null
    let { data: users, error } = await supabase.from('users').select('*').eq('user_id', user?.id)
    if (users){

        role = users[0].role 
    }
    
    if (!user) {
        redirect('/login')
    }

    if(role !== 'seeker'){
        redirect('/')
    }
    
    return <>{children}</>;

}
