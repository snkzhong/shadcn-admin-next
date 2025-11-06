"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { cn } from "~/lib/utils";

const mock = [
  { id: "1", title: "Home", shortcut: "⌘H" },
  { id: "2", title: "Settings", shortcut: "⌘," },
  { id: "3", title: "Profile", shortcut: "⌘P" },
  { id: "4", title: "Theme", shortcut: "⌘T" },
  { id: "5", title: "Language", shortcut: "⌘L" },
];

export default function QuickSearch({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className={cn(className)}>
      {/* 快捷搜索输入框（只读，用于触发） */}
      <div
        className="relative w-full max-w-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Input
          readOnly
          placeholder="Search"
          className="pl-10 pr-12"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Badge variant="secondary" className="text-xs">
            ⌘Q
          </Badge>
        </div>
      </div>

      {/* Command 弹层 */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick Actions">
              {mock.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    console.log(item.title);
                    setOpen(false);
                  }}
                >
                  <span>{item.title}</span>
                  {item.shortcut && (
                    <div className="ml-auto text-xs tracking-widest opacity-60">
                      {item.shortcut}
                    </div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem onSelect={() => {}}>Light</CommandItem>
              <CommandItem onSelect={() => {}}>Dark</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
