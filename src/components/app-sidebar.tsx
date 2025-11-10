"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  MessageCircleMore,
  Mail,
  Music4,
  Aperture,
  ShoppingCart,
  Table,
  ChartLine,
  Image,
  CircleQuestionMark,
  ShieldUser,
  StepForward,
  CircleDollarSign,
  FilePenLine,
  Component,
  LayoutDashboard,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import { NavUser } from "~/components/nav-user";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { Link } from '~/i18n/navigation';

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navDashboard: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
  ],
  navApps: [
    {
      title: "Chat",
      url: "/apps/chat",
      icon: MessageCircleMore,
      isActive: true,
    },
    {
      title: "Mail",
      url: "/apps/mail",
      icon: Mail,
      isActive: true,
    },
    {
      title: "Music",
      url: "/apps/music",
      icon: Music4,
      isActive: true,
    },
    {
      title: "Chatgpt",
      url: "/apps/chatgpt",
      icon: Aperture,
      isActive: true,
    },
    {
      title: "ecommerce",
      url: "#",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/apps/ecommerce/dashboard",
        },
        {
          title: "Products",
          url: "/apps/ecommerce/products",
        },
        {
          title: "Orders",
          url: "/apps/ecommerce/orders",
        },
      ]
    },
  ],
  navPages: [
    {
      title: "Authentication",
      url: "#",
      icon: ShieldUser,
      isActive: true,
      items: [
        {
          title: "Simple",
          url: "/pages/authentication/simple",
        },
        {
          title: "Two Column",
          url: "/pages/authentication/two-column",
        },
        {
          title: "Form Image",
          url: "/pages/authentication/form-image",
        },
      ],
    },
    {
      title: "Faq",
      url: "/pages/faq",
      icon: CircleQuestionMark,
      isActive: true,
    },
    {
      title: "Timeline",
      url: "/pages/timeline",
      icon: StepForward,
      isActive: true,
    },
    {
      title: "Pricing",
      url: "/pages/pricing",
      icon: CircleDollarSign,
      isActive: true,
    }
  ],
  navComponents: [
    {
      title: "Shadcn UI",
      url: "#",
      icon: Component,
      items: [
        {
          title: "Alert",
          url: "/shadcnui/alert",
        },
        {
          title: "Button",
          url: "/shadcnui/button",
        },
        {
          title: "Card",
          url: "/shadcnui/card",
        },
        {
          title: "Carousel",
          url: "/shadcnui/carousel",
        },
        {
          title: "Dropdown",
          url: "/shadcnui/dropdown",
        },
        {
          title: "Modal",
          url: "/shadcnui/modal",
        },
        {
          title: "Popover",
          url: "/shadcnui/popover",
        },
        {
          title: "Tabs",
          url: "/shadcnui/tabs",
        },
        {
          title: "Progress",
          url: "/shadcnui/progress",
        },
        {
          title: "Toast",
          url: "/shadcnui/toast",
        },
        {
          title: "Menu",
          url: "/shadcnui/menu",
        },
        {
          title: "Date Picker",
          url: "/shadcnui/date-picker",
        },
      ]
    },
    {
      title: "Forms",
      url: "#",
      icon: FilePenLine,
      items: [
        {
          title: "Basic",
          url: "/forms/basic",
        },
        {
          title: "Select",
          url: "/forms/select",
        },
        {
          title: "File Upload",
          url: "/forms/file-upload",
        },
        {
          title: "Editor",
          url: "/forms/editor",
        },
        {
          title: "Wizard",
          url: "/forms/wizard",
        },
        {
          title: "Validation",
          url: "#",
        },
        {
          title: "Advanced",
          url: "#",
        },
      ],
    },
    {
      title: "Tables",
      url: "#",
      icon: Table,
      items: [
        {
          title: "Basic",
          url: "/tables/basic",
        },
        {
          title: "Data Table",
          url: "/tables/data-table",
        }
      ],
    },
    {
      title: "Icons",
      url: "#",
      icon: Image,
      items: [
        {
          title: "Lucide",
          url: "/icons/lucide",
        },
        {
          title: "HeroIcons",
          url: "/icons/heroicons",
        },
        {
          title: "Tabler",
          url: "/icons/tabler",
        }
      ],
    },
    {
      title: "Charts",
      url: "#",
      icon: ChartLine,
      items: [
        {
          title: "Area Charts",
          url: "/charts/area",
        },
        {
          title: "Bar Charts",
          url: "/charts/bar",
        },
        {
          title: "Line Charts",
          url: "/charts/line",
        },
        {
          title: "Pie Charts",
          url: "/charts/pie",
        },
        {
          title: "Radar Charts",
          url: "/charts/radar",
        },
        {
          title: "Radial Charts",
          url: "/charts/radial",
        },
        {
          title: "Tooltips",
          url: "/charts/tooltips",
        }
      ],
    },
    {
      title: "Maps",
      url: "#",
      icon: Map,
      items: [
        {
          title: "Leaflet",
          url: "/maps/leaflet",
        },
        {
          title: "maplibre",
          url: "/maps/maplibre",
        }
      ]
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>

        <SidebarMenu>
      <SidebarMenuItem>
            <div
              className="flex gap-2 py-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <img src="/logo.png" className="size-8" />
              </div>
              <Link href="/">
              <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">Shadcn Admin</span>
                  <span className="truncate text-xs">shadcn ui & next.js</span>
              </div>
              </Link>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>

      </SidebarHeader>
      <SidebarContent>
        <NavMain title="" items={data.navDashboard} />
        <NavMain title="Apps" items={data.navApps} />
        <NavMain title="Pages" items={data.navPages} />
        <NavMain title="Components" items={data.navComponents} />
        <NavProjects title="others" projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
