import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar"

import { Users, SquarePlus, HomeIcon, Merge} from "lucide-react"

const sidebarContent = [
  {
    title: "Home",
    url: "/home",
    icon: HomeIcon,
  },
  {
    title: "Existing Clubs",
    url: "/clubs",
    icon: Users,
  },
  {
    title: "Create Club",
    url: "/create-club",
    icon: SquarePlus,
  },
  {
    title: "Join Club",
    url: "/join-club",
    icon: Merge,
  },
]
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup />
          <SidebarMenu>
            {sidebarContent.map((item) => (
                <SidebarMenuItem key={item.title}  className="pl-4 pr-4">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}