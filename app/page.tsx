import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { Button } from "@nextui-org/button";
import { createClient } from "@/utils/supabase/server";
import seeker from "@/components/seeker";
import landlord from "@/components/landlord";
import { redirect } from "next/navigation";
import admin from "@/components/admin";

export default async function Home() {
	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser()
	

	if (user) {
		let { data: users, error } = await supabase.from('users').select('*').eq('user_id', user?.id)

		if (users && users[0].verified === false) {
			redirect("/register/cin_verify")
		}

		let role = null
		if (users) {
			role = users[0].role
		}

		switch (role) {
			case 'admin':
				return redirect(`/admin/`)
			case 'seeker':
				return (
					<section className="">
						{seeker()}
					</section>
				);
			case 'landlord':
				return (
					<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
						{landlord()}
					</section>
				);
			case 'company':
				const { data, error } = await supabase.from('company').select('*').eq('user_id', user?.id)
			
				if (data) {
					return redirect(`/Company/${data[0].id}`)
				}
				else{
					return redirect('/login')
				}

				
			default:
				return (
					<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
						<div className="inline-block max-w-lg text-center justify-center">
							<h1 className='text-4xl font-bold'>

								Welcome to</h1>
							<h1 className='text-4xl font-bold'>Uprent</h1>

							<br />
							<h1 className='text-2xl'>
								Your ultimate solution for seamless renting.
							</h1>
							<h2 className='text-lg'>
								Efficient, user-friendly and modern renting app.
							</h2>
							<Code className="mt-4">
								<Snippet>
									This Landing Page need to be updated
								</Snippet>
							</Code>
						</div>

						<div className="flex gap-3">
							<Link href={'/pricing'}>
								<Button color="danger" variant="bordered" className=" hover:bg-danger-500 hover:text-white ">
									See Pricing
								</Button>

							</Link>

						</div>


					</section>
				);
		}


	} else {
		return (
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className='	
					text-4xl font-bold'>

						Welcome to</h1>
					<h1 className='text-4xl font-bold'>Uprent</h1>

					<br />
					<h1 className='text-2xl'>
						Your ultimate solution for seamless renting.
					</h1>
					<h2 className='text-lg'>
						Efficient, user-friendly and modern renting app.
					</h2>
					<Code className="mt-4">
						<Snippet>
							This Landing Page need to be updated
						</Snippet>
					</Code>
				</div>

				<div className="flex gap-3">
					<Link href={'/pricing'}>
						<Button color="danger" variant="bordered" className=" hover:bg-danger-500 hover:text-white ">
							See Pricing
						</Button>

					</Link>

				</div>


			</section>
		);
	}
}
