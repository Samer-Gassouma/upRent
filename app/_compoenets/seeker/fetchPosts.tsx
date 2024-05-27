"use Server"
import { createClient } from "@/utils/supabase/server";

export default async function fetchPosts() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()
    let { data: posts, error } = await supabase.from('record').select('*').eq('createdBy', user?.id).eq('active', 'true')

    return posts
}

export async function fetch_proposals_by_Post(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase.from('proposal').select('*,proposal_Images(url,proposal_id)')
        .eq('active', true)
        .eq('record_id', id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error)
    }
    return data;
}

export async function fetchPostDetails() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase.from('record').select('*').eq('createdBy', user?.id)

    if (error) {
        console.error(error)
    }
    return data;
}