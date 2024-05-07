export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "UpRent",
	description: "Renting made easy",
	navItems: [
		{
			label: "Home",
			href: "/",
			roles: ['']
		},

		{
			label: "Pricing",
			href: "/pricing",
			roles: ['']
		},
		{
			label: "About",
			href: "/about",
			roles: ['']
		},

		//admin routes
		{
			label: "Companies",
			href: "/companies",
			roles: ['admin']
		},
		{
			label: "Requests",
			href: "/requests",
			roles: ['admin']
		},

		//Seeker routes

		{
			label: "Create Post",
			href: "/create-post",
			roles: ['seeker']
		},
		{
			label: "My Posts",
			href: "/my-posts",
			roles: ['seeker']
		},


		//landlord routes

		{
			label: "My Proposals",
			href: "/my-proposals",
			roles: ['landlord']
		},
	
		{
			label: "My Tenants",
			href: "/my-tenants",
			roles: ['landlord']
		},
		{
			label: "My Payments",
			href: "/my-payments",
			roles: ['landlord']
		},
		{
			label: "My Contracts",
			href: "/my-contracts",
			roles: ['landlord']
		},



	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],

};
