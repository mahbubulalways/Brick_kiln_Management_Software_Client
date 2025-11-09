"use client";

import * as React from "react";
import Link from "next/link";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // ✅ Use shadcn wrapped components

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ✅ shadcn avatar component

export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 cursor-pointer ">
          <AvatarImage src="/avatar.jpg" alt="User Avatar" />
          <AvatarFallback className="bg-gray-200">
            <User className="w-5 h-5 text-gray-600" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        align="start"
        className="w-44 p-2 rounded-lg shadow-md bg-white"
      >
        {/* Menu Items */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="menu-item">
            <User size={16} />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="menu-item">
            <Settings size={16} />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/help" className="menu-item">
            <CircleHelpIcon size={16} />
            Help
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/tasks" className="menu-item">
            <CircleIcon size={16} />
            To Do
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/done" className="menu-item">
            <CircleCheckIcon size={16} />
            Done
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/logout"
            className="menu-item text-red-500 hover:text-red-600"
          >
            <LogOut size={16} className="text-red-500" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
