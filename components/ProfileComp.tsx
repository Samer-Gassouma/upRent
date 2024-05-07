"use client";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { UsersRound } from 'lucide-react';
import { link as linkStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/link";

export default function ProfileComp() {
    const items = [
        {
            key: "profile",
            label: "Profile",
            href: "/profile",
        },
        {
            key: "settings",
            label: "Settings",
            href: "/settings",
        },
        {
            key: "logout",
            label: "Logout",
            href: "/logout",
        }

    ];

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className="text-sm font-normal text-default-600 bg-default-100"

                    startContent={<UsersRound className="text-danger" />}
                    variant="flat"
                >
                    Profile
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        color={item.key === "logout" ? "danger" : "default"}
                        className={item.key === "logout" ? "text-danger" : ""}
                        as={Link}
                        href={'/logout'} >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}
