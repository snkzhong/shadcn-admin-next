"use client"

import { useState } from 'react';
import { ChevronRight, Dot, type LucideIcon } from "lucide-react";

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

// 👇 Step 1: 创建一个新的子组件来处理单个菜单项
function NavItem({ item }: { 
  item: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }
}) {
  const [open, setOpen] = useState(false); // ✅ 正确：现在在子组件的顶层调用

  return (
    <MotionCollapsible
      key={item.title}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
      open={open}
      onOpenChange={setOpen}
    >
      <SidebarMenuItem>
        <MotionCollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} className="text-base">
            {item.icon && <item.icon size="2rem" />}
            {(item.url && item.url !== '#') ? (
              <Link href={item.url}><span>{item.title}</span></Link>
            ) : (
              <span>{item.title}</span>
            )}
            {item.items && (
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            )}
          </SidebarMenuButton>
        </MotionCollapsibleTrigger>

        <MotionCollapsibleContent open={item.items && open}>
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
  );
}

// 👇 Step 2: 原始组件只负责遍历并渲染子组件
export function NavMain({
  title,
  items,
}: {
  title?: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup className='py-0'>
      {title ? <SidebarGroupLabel className='h-4'>{title}</SidebarGroupLabel> : null}
      <SidebarMenu>
        {items.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}