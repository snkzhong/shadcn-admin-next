"use client";

import { useState, useEffect } from "react";
import * as Popover from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import * as Tabs from "~/components/ui/tabs";
import * as Accordion from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import * as Sheet from "~/components/ui/sheet";
import * as Command from "~/components/ui/command";
import { cn } from "~/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Plus,
  Trash2,
  Edit,
  Copy,
  Search,
  Loader2,
  Calendar,
  Users,
  Mail,
  Phone,
  MapPin,
  Globe,
  Palette,
  Keyboard,
  Download,
  UploadCloud,
  Image as ImageIcon,
  Film,
  Quote,
  Laptop,
  Tablet,
  Sun,
  Moon,
  Zap,
  Bell,
  HelpCircle,
  Eye,
  EyeOff,
  FileText,
  Folder,
  Move,
  Settings,
  LogOut,
  CreditCard,
  User,
  Star,
  Heart,
  Flag,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Expand,
  Radio,
  ShoppingCart,
} from "lucide-react";

/* ---------- little helpers ---------- */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="flex flex-wrap items-center gap-4">{children}</div>
  </section>
);

const PopCard = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded-lg border bg-white p-4 shadow-md w-80 dark:bg-slate-900",
      className
    )}
    {...props}
  />
);

/* ---------- basic ---------- */
function BasicPopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Basic Popover</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent>
        <PopCard>
          <h4 className="font-medium">Popover Title</h4>
          <p className="text-sm text-slate-600">This is a simple popover content.</p>
        </PopCard>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- all sides ---------- */
function AllSides() {
  const sides: Array<"top" | "right" | "bottom" | "left"> = ["top", "right", "bottom", "left"];
  const aligns: Array<"start" | "center" | "end"> = ["start", "center", "end"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {sides.map((side) =>
        aligns.map((align) => (
          <Popover.Popover key={`${side}-${align}`}>
            <Popover.PopoverTrigger asChild>
              <Button size="sm" variant="outline">{side}-{align}</Button>
            </Popover.PopoverTrigger>
            <Popover.PopoverContent side={side} align={align} className="w-48">
              <p className="text-sm">Side: {side}, Align: {align}</p>
            </Popover.PopoverContent>
          </Popover.Popover>
        ))
      )}
    </div>
  );
}

/* ---------- offset & arrow ---------- */
function OffsetArrow() {
  const [offset, setOffset] = useState(10);
  const [arrow, setArrow] = useState(true);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={arrow} onChange={(e) => setArrow(e.target.checked)} />
          Arrow
        </label>
        <label className="flex items-center gap-2 text-sm">
          Offset:
          <input
            type="number"
            className="w-20 border rounded px-2 py-1"
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
          />
        </label>
      </div>
      <Popover.Popover>
        <Popover.PopoverTrigger asChild>
          <Button variant="outline">Offset & Arrow</Button>
        </Popover.PopoverTrigger>
        <Popover.PopoverContent sideOffset={offset} arrowPadding={arrow ? 8 : 0}>
          <p className="text-sm">Offset: {offset}px</p>
        </Popover.PopoverContent>
      </Popover.Popover>
    </div>
  );
}

/* ---------- user profile card ---------- */
function UserProfilePopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">User Card</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-80">
        <PopCard>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=olivia" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Olivia Martin</p>
              <p className="text-xs text-slate-500">olivia@example.com</p>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="flex justify-around text-center">
            <div>
              <p className="text-lg font-bold">127</p>
              <p className="text-xs text-slate-500">Posts</p>
            </div>
            <div>
              <p className="text-lg font-bold">12k</p>
              <p className="text-xs text-slate-500">Followers</p>
            </div>
            <div>
              <p className="text-lg font-bold">847</p>
              <p className="text-xs text-slate-500">Following</p>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">Follow</Button>
            <Button size="sm" variant="outline" className="flex-1">Message</Button>
          </div>
        </PopCard>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- product quick view ---------- */
function ProductPopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Product Card</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-80">
        <PopCard>
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=60"
            alt="watch"
            className="rounded-lg object-cover h-40 w-full"
          />
          <h4 className="font-medium mt-2">Classic Watch</h4>
          <p className="text-sm text-slate-600">Sleek design, water resistant.</p>
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">4.8 (234)</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold">$249</span>
            <Button size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to cart
            </Button>
          </div>
        </PopCard>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- tabs inside ---------- */
function TabsPopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Tabs Popover</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-80">
        <Tabs.Tabs defaultValue="account">
          <Tabs.TabsList className="grid grid-cols-2">
            <Tabs.TabsTrigger value="account">Account</Tabs.TabsTrigger>
            <Tabs.TabsTrigger value="notes">Notes</Tabs.TabsTrigger>
          </Tabs.TabsList>
          <Tabs.TabsContent value="account" className="space-y-2 pt-2">
            <Label>Username</Label>
            <Input placeholder="olivia" />
          </Tabs.TabsContent>
          <Tabs.TabsContent value="notes" className="pt-2">
            <textarea className="w-full h-20 border rounded p-2 text-sm" placeholder="Type notes here..." />
          </Tabs.TabsContent>
        </Tabs.Tabs>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- accordion inside ---------- */
function AccordionPopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">FAQ Popover</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-80">
        <Accordion.Accordion type="single" collapsible>
          <Accordion.AccordionItem value="item-1">
            <Accordion.AccordionTrigger>Is it accessible?</Accordion.AccordionTrigger>
            <Accordion.AccordionContent>Yes. It adheres to WAI-ARIA.</Accordion.AccordionContent>
          </Accordion.AccordionItem>
          <Accordion.AccordionItem value="item-2">
            <Accordion.AccordionTrigger>Is it styled?</Accordion.AccordionTrigger>
            <Accordion.AccordionContent>Yes. It comes with default styles.</Accordion.AccordionContent>
          </Accordion.AccordionItem>
        </Accordion.Accordion>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- mini data table ---------- */
function MiniTablePopover() {
  const users = [
    { name: "Olivia Martin", email: "olivia@example.com", role: "Admin" },
    { name: "John Doe", email: "john@example.com", role: "Member" },
    { name: "Emma Wilson", email: "emma@example.com", role: "Member" },
  ];
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Mini Table</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-96">
        <PopCard>
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-4 w-4 text-slate-400" />
            <Input placeholder="Search users..." className="h-8 text-sm" />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2"><Badge>{u.role}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </PopCard>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- command palette inside ---------- */
function CommandPopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Command Popover</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-80 p-0">
        <Command.Command>
          <Command.CommandInput placeholder="Type a command..." />
          <Command.CommandList>
            <Command.CommandEmpty>No results found.</Command.CommandEmpty>
            <Command.CommandGroup heading="Suggestions">
              <Command.CommandItem onSelect={() => alert("Calendar")}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </Command.CommandItem>
              <Command.CommandItem onSelect={() => alert("Search")}>
                <Search className="mr-2 h-4 w-4" />
                <span>Search</span>
              </Command.CommandItem>
              <Command.CommandItem onSelect={() => alert("Settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Command.CommandItem>
            </Command.CommandGroup>
          </Command.CommandList>
        </Command.Command>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- nested popover ---------- */
function NestedPopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Parent Popover</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-64">
        <p className="text-sm mb-2">Parent content</p>
        <Popover.Popover>
          <Popover.PopoverTrigger asChild>
            <Button size="sm" variant="outline">Open Child</Button>
          </Popover.PopoverTrigger>
          <Popover.PopoverContent className="w-56">
            <p className="text-sm">Child popover content</p>
          </Popover.PopoverContent>
        </Popover.Popover>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- context menu (right-click) popover ---------- */
function ContextPopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <div className="border rounded p-10 text-center text-sm text-slate-600 cursor-context-menu">
          Right-click inside this box
        </div>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-48">
        <h4>Actions</h4>
        <Separator />
        <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-slate-100">Copy</button>
        <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-slate-100">Paste</button>
        <Separator />
        <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-slate-100 text-red-600">Delete</button>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- non-dismissable ---------- */
function NonDismissablePopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Non-dismissable</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <p className="text-sm">This popover will not close on outside click or Escape.</p>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- loading state ---------- */
function LoadingPopover() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(t);
    }
  }, [open]);
  return (
    <Popover.Popover open={open} onOpenChange={setOpen}>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Loading</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-48 flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading content...</span>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

type DDataType = {
  title: string;
  body: string;
};
/* ---------- dynamic api content ---------- */
function DynamicPopover() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DDataType>();
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setData({ title: "Dynamic Title", body: "Fetched from API." });
      }, 1000);
    }
  }, [open]);
  return (
    <Popover.Popover open={open} onOpenChange={setOpen}>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Dynamic Content</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-64">
        {data ? (
          <div>
            <p className="font-medium">{data.title}</p>
            <p className="text-sm text-slate-600">{data.body}</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        )}
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- responsive sheet fallback ---------- */
function ResponsivePopover() {
  const [open, setOpen] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (isMobile)
    return (
      <Sheet.Sheet open={open} onOpenChange={setOpen}>
        <Sheet.SheetTrigger asChild>
          <Button variant="outline">Mobile Sheet</Button>
        </Sheet.SheetTrigger>
        <Sheet.SheetContent side="bottom">
          <Sheet.SheetHeader>
            <Sheet.SheetTitle>Mobile Content</Sheet.SheetTitle>
          </Sheet.SheetHeader>
          <p className="text-sm text-slate-600">This is a sheet on mobile.</p>
        </Sheet.SheetContent>
      </Sheet.Sheet>
    );
  return (
    <Popover.Popover open={open} onOpenChange={setOpen}>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">Desktop Popover</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-64">
        <p className="text-sm">This is a popover on desktop.</p>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- rtl mode ---------- */
function RtlPopover() {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">RTL Popover</Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent dir="rtl" className="w-48">
        <p className="text-sm">محتوى البوب أوفر باللغة العربية</p>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- playground ---------- */
function Playground() {
  // 定义可选值的联合类型
  type Side = "top" | "right" | "bottom" | "left";
  type Align = "start" | "center" | "end";
  type Trigger = "click" | "hover";

  // 定义可选值数组用于类型检查
  const validSides: Side[] = ["top", "right", "bottom", "left"];
  const validAligns: Align[] = ["start", "center", "end"];
  const validTriggers: Trigger[] = ["click", "hover"];

  const [side, setSide] = useState<Side>("bottom");
  const [align, setAlign] = useState<Align>("center");
  const [offset, setOffset] = useState(8);
  const [trigger, setTrigger] = useState<Trigger>("click");
  const [open, setOpen] = useState(false);

  // 安全的类型转换函数
  const safelySetSide = (value: string) => {
    if (validSides.includes(value as Side)) {
      setSide(value as Side);
    }
  };

  const safelySetAlign = (value: string) => {
    if (validAligns.includes(value as Align)) {
      setAlign(value as Align);
    }
  };

  const safelySetTrigger = (value: string) => {
    if (validTriggers.includes(value as Trigger)) {
      setTrigger(value as Trigger);
    }
  };

  const content = (
    <Popover.PopoverContent side={side} align={align} sideOffset={offset}>
      <p className="text-sm">Side: {side}, Align: {align}, Offset: {offset}px</p>
    </Popover.PopoverContent>
  );

  return (
    <section className="mb-12 border rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Live Playground</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <label className="flex flex-col text-sm">
          Side
          <select
            className="mt-1 border rounded px-2 py-1"
            value={side}
            onChange={(e) => safelySetSide(e.target.value)}
          >
            <option value="top">top</option>
            <option value="right">right</option>
            <option value="bottom">bottom</option>
            <option value="left">left</option>
          </select>
        </label>
        <label className="flex flex-col text-sm">
          Align
          <select
            className="mt-1 border rounded px-2 py-1"
            value={align}
            onChange={(e) => safelySetAlign(e.target.value)}
          >
            <option value="start">start</option>
            <option value="center">center</option>
            <option value="end">end</option>
          </select>
        </label>
        <label className="flex flex-col text-sm">
          Offset
          <input
            type="number"
            className="mt-1 border rounded px-2 py-1"
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col text-sm">
          Trigger
          <select
            className="mt-1 border rounded px-2 py-1"
            value={trigger}
            onChange={(e) => safelySetTrigger(e.target.value)}
          >
            <option value="click">click</option>
            <option value="hover">hover</option>
          </select>
        </label>
      </div>
      {trigger === "hover" ? (
        <Popover.Popover open={open} onOpenChange={setOpen}>
          <Popover.PopoverTrigger asChild>
            <Button
              variant="outline"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              Hover me
            </Button>
          </Popover.PopoverTrigger>
          {content}
        </Popover.Popover>
      ) : (
        <Popover.Popover>
          <Popover.PopoverTrigger asChild>
            <Button variant="outline">Click me</Button>
          </Popover.PopoverTrigger>
          {content}
        </Popover.Popover>
      )}
    </section>
  );
}

/* ---------- main page ---------- */
export default function PopoverShowcase() {
  return (
    <main className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">shadcn/ui Popover Gallery</h1>

      <Playground />

      <Section title="Basic">
        <BasicPopover />
        <UserProfilePopover />
        <ProductPopover />
      </Section>

      <Section title="All Sides & Aligns">
        <AllSides />
      </Section>

      <Section title="Offset & Arrow">
        <OffsetArrow />
      </Section>

      <Section title="Complex Content">
        <TabsPopover />
        <AccordionPopover />
        <MiniTablePopover />
        <CommandPopover />
      </Section>

      <Section title="Advanced">
        <NestedPopover />
        <ContextPopover />
        <NonDismissablePopover />
        <LoadingPopover />
        <DynamicPopover />
        <RtlPopover />
      </Section>
    </main>
  );
}