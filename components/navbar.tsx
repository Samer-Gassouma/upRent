"use client"
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";

import ProfileComp from "@/components/ProfileComp";
import { Link } from "@nextui-org/link";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@nextui-org/react";


import { UsersRound } from 'lucide-react';
import { useState, useEffect } from "react";
import Image from "next/image";
import manageAuth from "./manageAuth";

export function Navbar() {

	const [role, setRole] = useState(null);
	const [user, setUser] = useState([] as any);
	const [userDetails, setUserDetails] = useState([] as any);
	const [loading, setLoading] = useState(true);
	const auth = async () => {
		try {
			const { role, user } = await manageAuth();
			setRole(role);
			setUser(user);

		}
		catch (error) {
			console.log(error);
		}
		finally {
			setLoading(false);
		}

	}

	useEffect(() => {
		auth();
	}, []);





	const searchInput = (
		<Input
			aria-label="Search"  
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					p
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."

			type="search"
		/>
	);




	const renderNavbar = () => {
		return (
			<NextUINavbar maxWidth="xl" position="sticky">
				<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
					<NavbarBrand as="li" className="gap-3 max-w-fit">
						<NextLink className="flex justify-start items-center gap-1" href="/">
							<Image src="/logo.png" alt="UpRent Logo" width={50} height={50} />
							<p className="font-bold text-inherit">UpRent</p>
						</NextLink>
					</NavbarBrand>

					<ul className="hidden lg:flex gap-4 justify-start ml-2">
						{siteConfig.navItems.map((item) => (
							<>
								{role && item.roles.includes(role) && (
									<NavbarItem key={item.href}>
										<NextLink
											className={clsx(
												linkStyles({ color: "foreground" }),
												"data-[active=true]:text-primary data-[active=true]:font-medium"
											)}
											color="foreground"
											href={item.href}
										>
											{item.label}
										</NextLink>
									</NavbarItem>
								)}

							</>
						))}
					</ul>
				</NavbarContent>
			

				<NavbarContent
					className="hidden sm:flex basis-1/5 sm:basis-full"
					justify="end"
				>
					<NavbarItem className="hidden sm:flex gap-2">
						<ThemeSwitch />
					</NavbarItem>
					<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
					{loading ? (
						<div className="max-w-[300px] w-full flex items-center gap-3">
							<div>
								<Skeleton className="flex rounded-full w-12 h-12" />
							</div>
							<div className="w-full flex flex-col gap-2">
								<Skeleton className="h-3 w-3/5 rounded-lg" />
								<Skeleton className="h-3 w-4/5 rounded-lg" />
							</div>
						</div>
					) : (
						<NavbarItem className="hidden md:flex">
							{user ? (
								<ProfileComp />
							) : (
								<Button
									as={Link}
									className="text-sm font-normal text-default-600 bg-default-100"
									href={'/login'}
									startContent={<UsersRound className="text-danger" />}
									variant="flat"
								>
									Login
								</Button>
							)}
						</NavbarItem>
					)}

				</NavbarContent>

				<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">

					<ThemeSwitch />
					<NavbarMenuToggle />
				</NavbarContent>

				<NavbarMenu>
					<div className="mx-4 mt-2 flex flex-col gap-2">
						{siteConfig.navMenuItems.map((item, index) => (
							<NavbarMenuItem key={index}>
								<Link key={index}
									color={
										index === 2
											? "primary"
											: index === siteConfig.navMenuItems.length - 1
												? "danger"
												: "foreground"
									}
									href="#"
									size="lg"
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						))}
					</div>
				</NavbarMenu>
			</NextUINavbar>
		);
	}

	return renderNavbar();
};
