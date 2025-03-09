"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { LayoutDashboard, FileText, ImageIcon, MessageSquare, LogOut, Home } from "lucide-react"

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Blog",
      href: "/admin/blog",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Galeri",
      href: "/admin/gallery",
      icon: <ImageIcon className="w-5 h-5" />,
    },
    {
      title: "Testimoni",
      href: "/admin/testimonials",
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="p-4">
              <h1 className="text-xl font-bold text-blue-600">BrickProperty</h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={item.href}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home className="w-5 h-5" />
                    <span>Kembali ke Situs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto p-8">{children}</div>
      </div>
    </SidebarProvider>
  )
}

