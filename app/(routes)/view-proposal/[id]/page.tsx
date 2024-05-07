import { createClient } from "@/utils/supabase/server";
import Details from "@/app/_compoenets/seeker/Details";
import Image from "next/image";

async function Viewproposal({ params }: any) {

    const supabase = createClient()
    const { data, error } = await supabase.from('proposal').select('*,proposal_Images(url,proposal_id)').eq('id', params.id).eq('active', true)

    if (error) {
        console.error(error)
    }
    if (!data) {
        return <div>loading...</div>
    }
    const proposal = data[0] || null


    return (

        <div className='px-4 md:px-32 lg:px-56 my-3'>
            {proposal && <>
                <div className='flex gap-4 items-center'>
                    {proposal.proposal_Images.map((image: any) => (
                        <Image src={image.url} alt='image' key={image.proposal_id}
                        width={800} height={600} className='rounded-xl w-full object-cover h-[360px]' />
                    ))}
                 

                </div>
                <Details proposal={proposal} />
            </>}
        </div>
    )
}

export default Viewproposal