"use client";

import { useState, useEffect } from "react";
import * as DropdownMenu from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  User,
  CreditCard,
  Settings,
  Keyboard,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Copy,
  Check,
  Loader2,
  Globe,
  Bell,
  Clock,
  Search,
  Moon,
  Sun,
  Palette,
  FileText,
  Folder,
  Move,
  Download,
  Upload,
  Heart,
  Star,
  Flag,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Lock,
  Unlock,
  Zap,
  Radio,
} from "lucide-react";

/* ---------- little helpers ---------- */
const MenuItem = ({
  icon,
  label,
  shortcut,
  badge,
  onSelect,
  disabled,
}: {
  icon?: React.ReactNode;
  label: string;
  shortcut?: string;
  badge?: string;
  onSelect?: () => void;
  disabled?: boolean;
}) => (
  <DropdownMenu.DropdownMenuItem onSelect={onSelect} disabled={disabled}>
    {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
    <span className="flex-1">{label}</span>
    {badge && <Badge className="ml-auto mr-2">{badge}</Badge>}
    {shortcut && <DropdownMenu.DropdownMenuShortcut>{shortcut}</DropdownMenu.DropdownMenuShortcut>}
  </DropdownMenu.DropdownMenuItem>
);

const SubMenu = ({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) => (
  <DropdownMenu.DropdownMenuSub>
    <DropdownMenu.DropdownMenuSubTrigger>
      {trigger}
    </DropdownMenu.DropdownMenuSubTrigger>
    <DropdownMenu.DropdownMenuSubContent>{children}</DropdownMenu.DropdownMenuSubContent>
  </DropdownMenu.DropdownMenuSub>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="flex flex-wrap items-center gap-4">{children}</div>
  </section>
);

/* ---------- controlled filter menu ---------- */
function SearchableMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const items = ["Apple", "Banana", "Blueberry", "Cherry", "Grape", "Orange", "Pineapple"];
  const filtered = items.filter((i) => i.toLowerCase().includes(search.toLowerCase()));
  return (
    <DropdownMenu.DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenu.DropdownMenuTrigger asChild>
        <Button variant="outline">Searchable Fruits</Button>
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent className="w-56">
        <div className="px-2 pb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search fruit..."
              className="pl-8 pr-2 py-1.5 text-sm w-full border rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <DropdownMenu.DropdownMenuSeparator />
        {filtered.length ? (
          filtered.map((f) => (
            <DropdownMenu.DropdownMenuItem key={f} onSelect={() => alert(`Selected ${f}`)}>
              {f}
            </DropdownMenu.DropdownMenuItem>
          ))
        ) : (
          <DropdownMenu.DropdownMenuItem disabled>No results</DropdownMenu.DropdownMenuItem>
        )}
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}

/* ---------- multi-select menu ---------- */
function MultiSelectMenu() {
  const [selected, setSelected] = useState<string[]>([]);
  const options = ["Tags", "Categories", "Authors", "Date"];
  const toggle = (val: string) =>
    setSelected((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  return (
    <DropdownMenu.DropdownMenu>
      <DropdownMenu.DropdownMenuTrigger asChild>
        <Button variant="outline">Multi-select Filter</Button>
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent className="w-56">
        {options.map((opt) => (
          <DropdownMenu.DropdownMenuCheckboxItem
            key={opt}
            checked={selected.includes(opt)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => toggle(opt)}
          >
            {opt}
          </DropdownMenu.DropdownMenuCheckboxItem>
        ))}
        <DropdownMenu.DropdownMenuSeparator />
        <DropdownMenu.DropdownMenuItem onSelect={() => setSelected([])}>
          Clear all
        </DropdownMenu.DropdownMenuItem>
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}

/* ---------- split button ---------- */
function SplitButton() {
  const [loading, setLoading] = useState(false);
  const handlePrimary = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <Button onClick={handlePrimary} disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save
      </Button>
      <DropdownMenu.DropdownMenu>
        <DropdownMenu.DropdownMenuTrigger asChild>
          <Button variant="default" className="px-2 rounded-l-none border-l">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenu.DropdownMenuTrigger>
        <DropdownMenu.DropdownMenuContent align="end">
          <MenuItem label="Save and publish" onSelect={() => alert("Published")} />
          <MenuItem label="Save draft" onSelect={() => alert("Draft saved")} />
          <MenuItem label="Duplicate" onSelect={() => alert("Duplicated")} />
        </DropdownMenu.DropdownMenuContent>
      </DropdownMenu.DropdownMenu>
    </div>
  );
}

/* ---------- context menu ---------- */
function ContextMenuExample() {
  return (
    <DropdownMenu.DropdownMenu>
      <DropdownMenu.DropdownMenuTrigger asChild>
        <div className="border rounded p-10 text-center text-sm text-slate-600 cursor-context-menu">
          Right-click inside this box
        </div>
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent>
        <MenuItem icon={<Copy />} label="Copy" shortcut="Ctrl+C" />
        <MenuItem icon={<Edit />} label="Edit" shortcut="Ctrl+E" />
        <DropdownMenu.DropdownMenuSeparator />
        <MenuItem icon={<Trash2 />} label="Delete" shortcut="Del" />
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}

/* ---------- user selector ---------- */
function UserSelector() {
  const users = [
    { name: "Olivia Martin", email: "olivia@example.com", src: "https://i.pravatar.cc/150?u=olivia" },
    { name: "John Doe", email: "john@example.com", src: "https://i.pravatar.cc/150?u=john" },
  ];
  return (
    <DropdownMenu.DropdownMenu>
      <DropdownMenu.DropdownMenuTrigger asChild>
        <Button variant="outline">Select User</Button>
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent className="w-64">
        {users.map((u) => (
          <DropdownMenu.DropdownMenuItem key={u.email} onSelect={() => alert(`Selected ${u.name}`)}>
            <Avatar className="mr-2 h-6 w-6">
              <AvatarImage src={u.src} />
              <AvatarFallback>{u.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{u.name}</p>
              <p className="text-xs text-slate-500">{u.email}</p>
            </div>
          </DropdownMenu.DropdownMenuItem>
        ))}
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}

/* ---------- language selector ---------- */
function LanguageSelector() {
  const langs = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
  ];
  return (
    <DropdownMenu.DropdownMenu>
      <DropdownMenu.DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Globe className="mr-2 h-4 w-4" />
          Language
        </Button>
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent className="w-48">
        {langs.map((l) => (
          <DropdownMenu.DropdownMenuItem key={l.code} onSelect={() => alert(`Switched to ${l.name}`)}>
            <span className="mr-2 text-lg">{l.flag}</span>
            {l.name}
          </DropdownMenu.DropdownMenuItem>
        ))}
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}

/* ---------- notification center ---------- */
function NotificationCenter() {
  const notifs = [
    { id: 1, title: "New order received", time: "5 min ago", unread: true },
    { id: 2, title: "Your item has shipped", time: "1 hour ago", unread: true },
    { id: 3, title: "Payment processed", time: "3 hours ago", unread: false },
  ];
  return (
    <DropdownMenu.DropdownMenu>
      <DropdownMenu.DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
          <Badge className="ml-2">{notifs.filter((n) => n.unread).length}</Badge>
        </Button>
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent className="w-80">
        <DropdownMenu.DropdownMenuLabel>Notifications</DropdownMenu.DropdownMenuLabel>
        <DropdownMenu.DropdownMenuSeparator />
        {notifs.map((n) => (
          <DropdownMenu.DropdownMenuItem key={n.id} onSelect={() => alert(`Open: ${n.title}`)}>
            <div className="flex flex-col flex-1">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {n.time}
              </p>
            </div>
            {n.unread && <div className="h-2 w-2 rounded-full bg-blue-600" />}
          </DropdownMenu.DropdownMenuItem>
        ))}
        <DropdownMenu.DropdownMenuSeparator />
        <DropdownMenu.DropdownMenuItem onSelect={() => alert("Mark all read")}>
          Mark all as read
        </DropdownMenu.DropdownMenuItem>
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}

/* ---------- playground ---------- */
function Playground() {
  // 定义联合类型
  type Side = "top" | "right" | "bottom" | "left";
  type Align = "start" | "center" | "end";
  type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost";
  type Size = "default" | "sm" | "lg";

  // 定义有效值数组用于类型检查
  const validVariants: Variant[] = ["default", "destructive", "outline", "secondary", "ghost"];
  const validSizes: Size[] = ["default", "sm", "lg"];
  const validSides: Side[] = ["top", "right", "bottom", "left"];
  const validAligns: Align[] = ["start", "center", "end"];

  const [side, setSide] = useState<Side>("bottom");
  const [align, setAlign] = useState<Align>("center");
  const [variant, setVariant] = useState<Variant>("default");
  const [size, setSize] = useState<Size>("default");

  // 安全的类型转换函数
  const setValidVariant = (value: string) => {
    if (validVariants.includes(value as Variant)) {
      setVariant(value as Variant);
    }
  };

  const setValidSize = (value: string) => {
    if (validSizes.includes(value as Size)) {
      setSize(value as Size);
    }
  };

  const setValidSide = (value: string) => {
    if (validSides.includes(value as Side)) {
      setSide(value as Side);
    }
  };

  const setValidAlign = (value: string) => {
    if (validAligns.includes(value as Align)) {
      setAlign(value as Align);
    }
  };

  return (
    <section className="mb-12 border rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Live Playground</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <label className="flex flex-col text-sm">
          Variant
          <select
            className="mt-1 border rounded px-2 py-1"
            value={variant}
            onChange={(e) => setValidVariant(e.target.value)}
          >
            <option value="default">default</option>
            <option value="destructive">destructive</option>
            <option value="outline">outline</option>
            <option value="secondary">secondary</option>
            <option value="ghost">ghost</option>
          </select>
        </label>
        <label className="flex flex-col text-sm">
          Size
          <select
            className="mt-1 border rounded px-2 py-1"
            value={size}
            onChange={(e) => setValidSize(e.target.value)}
          >
            <option value="default">default</option>
            <option value="sm">sm</option>
            <option value="lg">lg</option>
          </select>
        </label>
        <label className="flex flex-col text-sm">
            Side
            <select
              className="mt-1 border rounded px-2 py-1"
              value={side}
              onChange={(e) => setValidSide(e.target.value)}
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
              onChange={(e) => setValidAlign(e.target.value)}
            >
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
            </select>
          </label>
      </div>

      <DropdownMenu.DropdownMenu>
        <DropdownMenu.DropdownMenuTrigger asChild>
          <Button variant={variant} size={size}>
            Open Menu
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenu.DropdownMenuTrigger>
        <DropdownMenu.DropdownMenuContent side={side} align={align} sideOffset={8}>
          <MenuItem label="Action" shortcut="⌘A" />
          <MenuItem label="Another action" shortcut="⌘⇧A" />
          <DropdownMenu.DropdownMenuSeparator />
          <SubMenu trigger={<span className="flex items-center gap-2"><Folder className="h-4 w-4" />More</span>}>
            <MenuItem label="Move to project" />
            <MenuItem label="Archive" />
          </SubMenu>
          <DropdownMenu.DropdownMenuSeparator />
          <MenuItem label="Delete" icon={<Trash2 />} shortcut="⌘⌫" />
        </DropdownMenu.DropdownMenuContent>
      </DropdownMenu.DropdownMenu>
    </section>
  );
}

/* ---------- main page ---------- */
export default function DropdownShowcase() {
  return (
    <main className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">shadcn/ui Dropdown Menu Gallery</h1>

      <Playground />

      <Section title="Basic">
        <DropdownMenu.DropdownMenu>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <Button variant="outline">Options</Button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent>
            <MenuItem label="Profile" />
            <MenuItem label="Billing" />
            <MenuItem label="Team" />
            <MenuItem label="Subscription" />
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.DropdownMenu>
      </Section>

      <Section title="With Icons &amp; Shortcuts">
        <DropdownMenu.DropdownMenu>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <Button>Actions</Button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent className="w-56">
            <MenuItem label="New File" icon={<Plus />} shortcut="⌘N" />
            <MenuItem label="Copy" icon={<Copy />} shortcut="⌘C" />
            <MenuItem label="Paste" icon={<Edit />} shortcut="⌘V" />
            <DropdownMenu.DropdownMenuSeparator />
            <MenuItem label="Delete" icon={<Trash2 />} shortcut="⌘⌫" />
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.DropdownMenu>
      </Section>

      <Section title="Groups &amp; Labels">
        <DropdownMenu.DropdownMenu>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <Button variant="outline">Settings</Button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent className="w-56">
            <DropdownMenu.DropdownMenuLabel>My Account</DropdownMenu.DropdownMenuLabel>
            <DropdownMenu.DropdownMenuSeparator />
            <MenuItem label="Profile" icon={<User />} />
            <MenuItem label="Billing" icon={<CreditCard />} />
            <MenuItem label="Keyboard shortcuts" icon={<Keyboard />} shortcut="⌘K" />
            <DropdownMenu.DropdownMenuSeparator />
            <DropdownMenu.DropdownMenuLabel>More</DropdownMenu.DropdownMenuLabel>
            <MenuItem label="Team" icon={<Users />} />
            <MenuItem label="Invite users" icon={<Plus />} />
            <SubMenu trigger="Share">
              <MenuItem label="Email" />
              <MenuItem label="Message" />
              <MenuItem label="More..." />
            </SubMenu>
            <DropdownMenu.DropdownMenuSeparator />
            <MenuItem label="Log out" icon={<LogOut />} shortcut="⇧⌘Q" />
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.DropdownMenu>
      </Section>

      <Section title="Checkable Items">
        <DropdownMenu.DropdownMenu>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <Button variant="outline">View</Button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent className="w-48">
            <DropdownMenu.DropdownMenuCheckboxItem checked>Status Bar</DropdownMenu.DropdownMenuCheckboxItem>
            <DropdownMenu.DropdownMenuCheckboxItem checked>Activity Bar</DropdownMenu.DropdownMenuCheckboxItem>
            <DropdownMenu.DropdownMenuCheckboxItem>Panel</DropdownMenu.DropdownMenuCheckboxItem>
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.DropdownMenu>
      </Section>

      <Section title="Radio Group">
        <DropdownMenu.DropdownMenu>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <Button variant="outline">Sort</Button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent className="w-48">
            <DropdownMenu.DropdownMenuRadioGroup value="name">
              <DropdownMenu.DropdownMenuRadioItem value="name">Name</DropdownMenu.DropdownMenuRadioItem>
              <DropdownMenu.DropdownMenuRadioItem value="date">Date modified</DropdownMenu.DropdownMenuRadioItem>
              <DropdownMenu.DropdownMenuRadioItem value="size">Size</DropdownMenu.DropdownMenuRadioItem>
            </DropdownMenu.DropdownMenuRadioGroup>
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.DropdownMenu>
      </Section>

      <Section title="Loading &amp; Disabled">
        <DropdownMenu.DropdownMenu>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent className="w-48">
            <MenuItem label="Normal" />
            <MenuItem label="Disabled" disabled />
            <DropdownMenu.DropdownMenuSeparator />
            <DropdownMenu.DropdownMenuItem disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </DropdownMenu.DropdownMenuItem>
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.DropdownMenu>
      </Section>

      <Section title="Dark Theme">
        <div className="dark bg-slate-900 p-6 rounded-lg">
          <DropdownMenu.DropdownMenu>
            <DropdownMenu.DropdownMenuTrigger asChild>
              <Button variant="outline">Dark Menu</Button>
            </DropdownMenu.DropdownMenuTrigger>
            <DropdownMenu.DropdownMenuContent>
              <MenuItem label="Settings" icon={<Settings />} />
              <MenuItem label="Preferences" icon={<Palette />} />
              <DropdownMenu.DropdownMenuSeparator />
              <MenuItem label="Log out" icon={<LogOut />} />
            </DropdownMenu.DropdownMenuContent>
          </DropdownMenu.DropdownMenu>
        </div>
      </Section>

      <Section title="Context Menu (Right Click)">
        <ContextMenuExample />
      </Section>

      <Section title="Searchable Menu">
        <SearchableMenu />
      </Section>

      <Section title="Multi-select Filter">
        <MultiSelectMenu />
      </Section>

      <Section title="Split Button">
        <SplitButton />
      </Section>

      <Section title="User Selector">
        <UserSelector />
      </Section>

      <Section title="Language Selector">
        <LanguageSelector />
      </Section>

      <Section title="Notification Center">
        <NotificationCenter />
      </Section>

      <Section title="Toolbar Example">
        <div className="flex items-center gap-2 p-2 border rounded-lg w-fit">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <DropdownMenu.DropdownMenu>
            <DropdownMenu.DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenu.DropdownMenuTrigger>
            <DropdownMenu.DropdownMenuContent>
              <MenuItem label="Share" />
              <MenuItem label="Export" />
              <DropdownMenu.DropdownMenuSeparator />
              <MenuItem label="Delete" icon={<Trash2 />} />
            </DropdownMenu.DropdownMenuContent>
          </DropdownMenu.DropdownMenu>
        </div>
      </Section>
    </main>
  );
}