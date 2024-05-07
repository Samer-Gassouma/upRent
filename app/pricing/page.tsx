import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from "@nextui-org/react";


const featuresBasic = [
	"Limited Property Listings",
	"Standard Search & Filters",
	"Basic Messaging",
	"Standard Contract Templates",
];

const featuresPlus = [
	"Unlimited Property Listings",
	"Advanced Search & Filters",
	"Increased Connects",
	"Customizable Contracts",
	"Premium Reporting & Analytics",
];


export default function PricingPage() {
	return (
		<div className="flex flex-col items-center justify-center  ">
			<div className="container mx-auto max-w-screen-lg">
				<h1 className="text-center text-3xl font-bold mb-8">
					Choose {' '}
					<span className="text-purple-500">
						the Plan {' '}
					</span>
					Thats Right for You
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center">
					<div className="w-70">
						<Card
							isPressable
							bordered
							shadow={false}
							css={{
								minHeight: '500px',
								transform: 'scale(1.02)',
								transition: 'transform 0.2s ease-in-out'
							}}
							className="flex flex-col justify-between w-full"

						>
							<CardHeader className="flex justify-center items-center flex-col rounded-t-lg bg-gradient-to-tr from-blue-500 to-purple-500">
								<h3 color="white" className="font-bold">
									Basic Plan
								</h3>
								<h4 color="white" className="text-2xl font-semibold">
									9.9 dt/month
								</h4>
								<Chip color="warning" className="mt-2">
									First Month Free
								</Chip>
							</CardHeader>
							<CardBody>
								<ul className="list-disc ml-6">
									{featuresBasic.map((feature) => (
										<li key={feature}>{feature}</li>
									))}
								</ul>
							</CardBody>
							<CardFooter className="justify-center">
							<span className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg p-3 rounded-full">
									Choose Plan
								</span>
							</CardFooter>
						</Card>
					</div>
					<div className="w-80">
						<Card
							isPressable
							bordered
							shadow={false}
							css={{
								minHeight: '500px',
								transform: 'scale(1.02)',
								transition: 'transform 0.2s ease-in-out'
							}}
							className="flex flex-col justify-between w-full"
						>
							<CardHeader className="flex justify-center items-center flex-col bg-green-500 rounded-t-lg">
								<h3 color="white" className="font-bold">
									Uprent Plus Plan
								</h3>
								<h4 color="white" className="text-2xl font-semibold">
									19.9 dt/month
								</h4>
							</CardHeader>
							<CardBody>
								<ul className="list-disc ml-6">
									{featuresPlus.map((feature) => (
										<li key={feature}>{feature}</li>
									))}
								</ul>
							</CardBody>
							<CardFooter className="justify-center">
								<span className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg p-3 rounded-full">
									Choose Plan
								</span>

							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}


