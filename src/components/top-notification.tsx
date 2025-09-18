"use client";

import * as React from "react";
import {
  Bell, Dot, 
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Mail,
  CreditCard,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

export type NotificationItem = {
  id: string;
  title: string;
  description?: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error' | 'invite' | 'payment';
};

const iconMap: Record<NotificationItem['type'], { icon: LucideIcon; color: string }> = {
  info:    { icon: Info,          color: 'bg-blue-100 text-blue-600' },
  success: { icon: CheckCircle,   color: 'bg-green-100 text-green-600' },
  warning: { icon: AlertTriangle, color: 'bg-amber-100 text-amber-600' },
  error:   { icon: XCircle,       color: 'bg-red-100 text-red-600' },
  invite:  { icon: Mail,          color: 'bg-purple-100 text-purple-600' },
  payment: { icon: CreditCard,    color: 'bg-indigo-100 text-indigo-600' },
};

export function TopNotification({
  data,
  onRead,
  onViewMore,
}: {
  data: NotificationItem[];
  onRead?: (id: string) => void;        // 点击单条回调
  onViewMore?: () => void;              // 底部“查看更多”回调
}) {
  const unreadCount = React.useMemo(
    () => data.filter((m) => !m.read).length,
    [data]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        className="w-80 max-h-[80vh] p-0 flex flex-col"
      >
        {/* 顶部标题 + 总数 */}
        <div className="px-4 py-3 shrink-0">
          <h2 className="text-sm font-semibold">Notifications</h2>
          <p className="text-xs text-muted-foreground">
            total {data.length} items，{unreadCount} unread
          </p>
        </div>
        <Separator />

        {/* 消息列表 */}
        <div className="px-4 max-h-[50vh] overflow-auto">
        <ScrollArea className="h-full">
          {data.length === 0 && (
            <p className="text-sm text-muted-foreground py-6 text-center">
              No content
            </p>
          )}
          {data.map((item) => {
            const { icon: Icon, color } = iconMap[item.type];

            return (
            <div
              key={item.id}
              className="flex gap-3 py-3 cursor-pointer hover:bg-accent rounded px-2 -mx-2"
              onClick={() => onRead?.(item.id)}
            >
              {/* icon */}
               <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-5 w-5" />
              </div>

              {/* content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium">{item.title}</p>
                  {!item.read && <Dot className="text-blue-500" />}
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                )}
            </div>

            </div>
            )
          })}
        </ScrollArea>
        </div>

        <Separator />
        {/* 底部查看更多 */}
        <div className="px-4 py-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={onViewMore}
          >
            View more
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
