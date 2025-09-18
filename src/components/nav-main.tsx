"use client"

import { useState } from 'react';
import { ChevronRight, CircleDot, Dot, type LucideIcon } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "~/components/ui/collapsible";
import {
  MotionCollapsible,
  MotionCollapsibleTrigger,
  MotionCollapsibleContent,
} from "~/components/uiplus/collapsible-animated";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar";
import { Link } from '~/i18n/navigation';

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      {/*<SidebarGroupLabel>Platform</SidebarGroupLabel>*/}
      <SidebarMenu>
        {items.map((item) => {
          const [open, setOpen] = useState(false);

          return (
          <MotionCollapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible" 
            open={open} onOpenChange={setOpen}
          >
            <SidebarMenuItem>
              <MotionCollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} className="text-base">
                  {item.icon && <item.icon size="2rem" />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </MotionCollapsibleTrigger>

              <MotionCollapsibleContent open={open}>
                
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild className="text-base">
                        <Link href={subItem.url}>
                          <Dot />
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>

              </MotionCollapsibleContent>
            </SidebarMenuItem>
          </MotionCollapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
