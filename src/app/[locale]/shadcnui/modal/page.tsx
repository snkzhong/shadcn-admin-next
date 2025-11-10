"use client";

import { useState, useEffect } from "react";
import * as Dialog from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import * as Tabs from "~/components/ui/tabs";
import * as Accordion from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import {
  Plus,
  Trash2,
  Edit,
  Copy,
  Check,
  X,
  Upload,
  FileText,
  User,
  CreditCard,
  Settings,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Search,
  Loader2,
  ChevronDown,
  ChevronRight,
  Expand,
  Zap,
  Bell,
  HelpCircle,
  Image as ImageIcon,
  Film,
  Quote,
  Laptop,
  Tablet,
  Globe,
  Palette,
  Keyboard,
  Download,
  UploadCloud,
  Sun,
  Moon,
  Calendar,
  Users
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import * as AlertDialog from "~/components/ui/alert-dialog";
import * as Sheet from "~/components/ui/sheet";
import * as Tooltip from "~/components/ui/tooltip";
import * as Popover from "~/components/ui/popover";
import { useForm } from "react-hook-form";
import { cn } from "~/lib/utils";

/* ---------- little helpers ---------- */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="flex flex-wrap items-center gap-4">{children}</div>
  </section>
);

/* ---------- confirm hook ---------- */
function useConfirm() {
  // 修复：显式声明 resolve 可能为 undefined
  const [resolve, setResolve] = useState<((value: boolean) => void) | undefined>();
  const [open, setOpen] = useState(false);
  const confirm = () =>
    new Promise<boolean>((res) => {
      setResolve(() => res);
      setOpen(true);
    });
  const handleClose = (val: boolean) => {
    resolve?.(val);
    setOpen(false);
  };
  const ConfirmDialog = () => (
    <Dialog.Dialog open={open} onOpenChange={() => handleClose(false)}>
      <Dialog.DialogContent className="max-w-sm">
        <Dialog.DialogHeader>
          <Dialog.DialogTitle>Are you absolutely sure?</Dialog.DialogTitle>
          <Dialog.DialogDescription>
            This action cannot be undone. This will permanently delete your data.
          </Dialog.DialogDescription>
        </Dialog.DialogHeader>
        <Dialog.DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => handleClose(true)}>Delete</Button>
        </Dialog.DialogFooter>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
  return { confirm, ConfirmDialog };
}

/* ---------- basic ---------- */
function BasicModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Basic Modal</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Confirm Action</Dialog.DialogTitle>
            <Dialog.DialogDescription>
              This will permanently delete the item. Continue?
            </Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- sizes ---------- */
function SizeVariants() {
  const sizes = ["sm", "default", "lg", "xl"] as const;
  const [size, setSize] = useState<typeof sizes[number]>("default");
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex gap-2">
        {sizes.map((s) => (
          <Button key={s} variant="outline" onClick={() => { setSize(s); setOpen(true); }}>
            {s === "default" ? "Default" : s.toUpperCase()}
          </Button>
        ))}
      </div>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className={cn(size === "xl" && "max-w-5xl", size === "lg" && "max-w-3xl", size === "sm" && "max-w-sm")}>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>{size.toUpperCase()} Modal</Dialog.DialogTitle>
            <Dialog.DialogDescription>Max-width class: {size === "default" ? "auto" : size}</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-slate-600">Resize the window to see responsive behavior.</p>
          </div>
          <Dialog.DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- full screen ---------- */
function FullscreenModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Expand className="mr-2 h-4 w-4" />
        Full-screen Editor
      </Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-none h-screen rounded-none">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Full-screen Modal</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="flex-1 grid place-items-center text-slate-600">
            <p>Your full-screen content here — e.g. rich editor, preview, etc.</p>
          </div>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- with avatar ---------- */
function AvatarModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>User Confirmation</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-md">
          <Dialog.DialogHeader className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://i.pravatar.cc/150?u=olivia" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <Dialog.DialogTitle>Olivia Martin</Dialog.DialogTitle>
              <Dialog.DialogDescription>olivia@example.com</Dialog.DialogDescription>
            </div>
          </Dialog.DialogHeader>
          <div className="text-center text-sm text-slate-600">
            Are you sure you want to transfer ownership to Olivia?
          </div>
          <Dialog.DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Transfer</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- with badge list ---------- */
function BadgeListModal() {
  const [open, setOpen] = useState(false);
  const tags = ["React", "Next.js", "Tailwind", "TypeScript", "shadcn/ui"];
  return (
    <>
      <Button onClick={() => setOpen(true)}>Tag Selector</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-lg">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Select Tags</Dialog.DialogTitle>
            <Dialog.DialogDescription>Choose tags for your project.</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div className="flex flex-wrap gap-2 py-4">
            {tags.map((t) => (
              <Badge key={t} variant="secondary" className="cursor-pointer">
                {t}
              </Badge>
            ))}
          </div>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- with tabs ---------- */
function TabsModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Settings (Tabs)</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-3xl">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Settings</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <Tabs.Tabs defaultValue="account" className="w-full">
            <Tabs.TabsList className="grid grid-cols-3">
              <Tabs.TabsTrigger value="account">Account</Tabs.TabsTrigger>
              <Tabs.TabsTrigger value="appearance">Appearance</Tabs.TabsTrigger>
              <Tabs.TabsTrigger value="notifications">Notifications</Tabs.TabsTrigger>
            </Tabs.TabsList>
            <Tabs.TabsContent value="account" className="space-y-4 pt-4">
              <Label>Username</Label>
              <Input placeholder="olivia" />
            </Tabs.TabsContent>
            <Tabs.TabsContent value="appearance" className="space-y-4 pt-4">
              <p className="text-sm">Select your theme.</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Sun className="mr-2 h-4 w-4" />Light</Button>
                <Button variant="outline" size="sm"><Moon className="mr-2 h-4 w-4" />Dark</Button>
              </div>
            </Tabs.TabsContent>
            <Tabs.TabsContent value="notifications" className="space-y-4 pt-4">
              <Label>Email notifications</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> New messages</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Marketing emails</label>
              </div>
            </Tabs.TabsContent>
          </Tabs.Tabs>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- with accordion ---------- */
function AccordionModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>FAQ (Accordion)</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-3xl">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Frequently Asked Questions</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <Accordion.Accordion type="single" collapsible className="w-full">
            <Accordion.AccordionItem value="item-1">
              <Accordion.AccordionTrigger>Is it accessible?</Accordion.AccordionTrigger>
              <Accordion.AccordionContent>Yes. It adheres to WAI-ARIA design pattern.</Accordion.AccordionContent>
            </Accordion.AccordionItem>
            <Accordion.AccordionItem value="item-2">
              <Accordion.AccordionTrigger>Is it styled?</Accordion.AccordionTrigger>
              <Accordion.AccordionContent>{`Yes. It comes with default styles that match the other components' aesthetic.`}</Accordion.AccordionContent>
            </Accordion.AccordionItem>
            <Accordion.AccordionItem value="item-3">
              <Accordion.AccordionTrigger>Is it customizable?</Accordion.AccordionTrigger>
              <Accordion.AccordionContent>Yes. You can customize it using Tailwind CSS.</Accordion.AccordionContent>
            </Accordion.AccordionItem>
          </Accordion.Accordion>
          <Dialog.DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- login form ---------- */
function LoginFormModal() {
  const [open, setOpen] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setOpen(false); }, 1500);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Login Form</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-md">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Welcome back</Dialog.DialogTitle>
            <Dialog.DialogDescription>Log in to your account</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="olivia@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pwd">Password</Label>
              <div className="relative">
                <Input id="pwd" type={showPwd ? "text" : "password"} placeholder="••••••••" />
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowPwd((s) => !s)}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Please wait" : "Log in"}
            </Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- file dropzone ---------- */
function FileUploadModal() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  // 修复：为 useDropzone 添加明确的类型
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (accepted: File[]) => setFiles(accepted),
  });
  return (
    <>
      <Button onClick={() => setOpen(true)}>Upload Files</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-xl">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Upload files</Dialog.DialogTitle>
            <Dialog.DialogDescription>Drag & drop or click to select.</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-slate-50"
          >
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto h-10 w-10 text-slate-400 mb-2" />
            <p className="text-sm text-slate-600">Drop files here or click to browse.</p>
          </div>
          {files.length > 0 && (
            <div className="mt-4 space-y-1">
              {files.map((f) => (
                <div key={f.name} className="text-sm flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  {f.name}
                </div>
              ))}
            </div>
          )}
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { alert("Upload simulated"); setOpen(false); }}>Upload</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- data table ---------- */
function DataTableModal() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  // 修复：为用户数组添加明确类型
  const users: Array<{ id: number; name: string; email: string; role: string }> = [
    { id: 1, name: "Olivia Martin", email: "olivia@example.com", role: "Admin" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "Member" },
    { id: 3, name: "Emma Wilson", email: "emma@example.com", role: "Member" },
  ];
  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <Button onClick={() => setOpen(true)}>User Management</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-4xl">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Manage Users</Dialog.DialogTitle>
            <Dialog.DialogDescription>Select a user to edit permissions.</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-4 w-4 text-slate-400" />
              <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="rounded border">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Role</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="border-t">
                      <td className="p-2">{u.name}</td>
                      <td className="p-2">{u.email}</td>
                      <td className="p-2"><Badge>{u.role}</Badge></td>
                      <td className="p-2">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- nested modal ---------- */
function NestedModal() {
  const [outer, setOuter] = useState(false);
  const [inner, setInner] = useState(false);
  return (
    <>
      <Button onClick={() => setOuter(true)}>Open Nested</Button>
      <Dialog.Dialog open={outer} onOpenChange={setOuter}>
        <Dialog.DialogContent className="max-w-xl">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Outer Modal</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <p className="text-sm text-slate-600">Click the button below to open another modal on top.</p>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOuter(false)}>Close</Button>
            <Button onClick={() => setInner(true)}>Open Inner</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
      <Dialog.Dialog open={inner} onOpenChange={setInner}>
        <Dialog.DialogContent className="max-w-md">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Inner Modal</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <p className="text-sm text-slate-600">This is a second layer.</p>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setInner(false)}>Close</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- cmd+k shortcut ---------- */
function CmdKModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // 修复：使用 React.KeyboardEvent 类型
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
    <>
      <Button onClick={() => setOpen(true)}>
        <Keyboard className="mr-2 h-4 w-4" />
        Press ⌘K
      </Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-2xl">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Command Palette</Dialog.DialogTitle>
            <Input placeholder="Type a command..." />
          </Dialog.DialogHeader>
          <div className="py-4 space-y-2">
            <div className="flex items-center gap-2 p-2 rounded hover:bg-slate-100 cursor-pointer">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Create new document</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded hover:bg-slate-100 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Open settings</span>
            </div>
          </div>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- non-dismissable ---------- */
function NonDismissableModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Non-dismissable</Button>
      <Dialog.Dialog open={open}>
        {/* 修复：使用 React.PointerEvent 和 React.KeyboardEvent 类型 */}
        <Dialog.DialogContent
          onPointerDownOutside={(e) => e.preventDefault()} 
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="max-w-md"
        >
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Critical Action</Dialog.DialogTitle>
            <Dialog.DialogDescription>You must complete this step to continue.</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <Dialog.DialogFooter>
            <Button onClick={() => setOpen(false)}>I Understand</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- loading state ---------- */
function LoadingModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handle = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setOpen(false); }, 2000);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Loading State</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-md">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Processing</Dialog.DialogTitle>
            <Dialog.DialogDescription>Please wait while we save your changes.</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div className="grid place-items-center py-8">
            <Loader2 className="h-10 w-10 animate-spin text-slate-600" />
          </div>
          <Dialog.DialogFooter>
            <Button disabled={loading} variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button disabled={loading} onClick={handle}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Saving..." : "Save"}
            </Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

type DDataType = {
  id: number;
  title: string;
  body: string;
};
/* ---------- dynamic api content ---------- */
function DynamicApiModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DDataType>();
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setData({ id: 1, title: "Dynamic Title", body: "This content was fetched from an API." });
      setLoading(false);
    }, 1500);
  };
  useEffect(() => {
    if (open) fetchData();
  }, [open]);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Load Dynamic Content</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-md">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Dynamic Content</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          {loading ? (
            <div className="grid place-items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : data ? (
            <div className="space-y-4 py-4">
              <h3 className="font-medium">{data.title}</h3>
              <p className="text-sm text-slate-600">{data.body}</p>
            </div>
          ) : (
            <p className="py-4 text-sm text-slate-600">No data found</p>
          )}
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- confirmation ---------- */
function ConfirmModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete Account</Button>
      <AlertDialog.AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialog.AlertDialogContent>
          <AlertDialog.AlertDialogHeader>
            <AlertDialog.AlertDialogTitle>Are you absolutely sure?</AlertDialog.AlertDialogTitle>
            <AlertDialog.AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </AlertDialog.AlertDialogDescription>
          </AlertDialog.AlertDialogHeader>
          <AlertDialog.AlertDialogFooter>
            <AlertDialog.AlertDialogCancel>Cancel</AlertDialog.AlertDialogCancel>
            <AlertDialog.AlertDialogAction onClick={() => alert("Deleted")}>Continue</AlertDialog.AlertDialogAction>
          </AlertDialog.AlertDialogFooter>
        </AlertDialog.AlertDialogContent>
      </AlertDialog.AlertDialog>
    </>
  );
}

/* ---------- sheet (modal drawer) ---------- */
function SheetModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open Sheet</Button>
      <Sheet.Sheet open={open} onOpenChange={setOpen}>
        <Sheet.SheetContent side="right">
          <Sheet.SheetHeader>
            <Sheet.SheetTitle>Edit profile</Sheet.SheetTitle>
            <Sheet.SheetDescription>Make changes to your profile here. Click save when you are done.</Sheet.SheetDescription>
          </Sheet.SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input placeholder="Olivia Martin" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input placeholder="olivia@example.com" />
            </div>
          </div>
          <Sheet.SheetFooter>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </Sheet.SheetFooter>
        </Sheet.SheetContent>
      </Sheet.Sheet>
    </>
  );
}

/* ---------- tooltip modal ---------- */
function TooltipModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Tooltip Demo</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-md">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Hover the button</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="flex justify-center py-6">
            <Tooltip.Tooltip>
              <Tooltip.TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </Tooltip.TooltipTrigger>
              <Tooltip.TooltipContent>
                <p>Hello from tooltip inside a modal!</p>
              </Tooltip.TooltipContent>
            </Tooltip.Tooltip>
          </div>
          <Dialog.DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- popover inside modal ---------- */
function PopoverModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Popover in Modal</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-lg">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Popover Demo</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="flex justify-center py-6">
            <Popover.Popover>
              <Popover.PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </Popover.PopoverTrigger>
              <Popover.PopoverContent className="w-48">
                <div className="grid gap-2">
                  <Button size="sm" variant="ghost">Action 1</Button>
                  <Button size="sm" variant="ghost">Action 2</Button>
                </div>
              </Popover.PopoverContent>
            </Popover.Popover>
          </div>
          <Dialog.DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- form with validation ---------- */
function FormValidationModal() {
  const [open, setOpen] = useState(false);
  // 修复：明确表单数据类型
  const { register, handleSubmit, formState: { errors } } = useForm<{ name: string; email: string }>();
  // 修复：移除 any 类型，使用明确的表单数据类型
  const onSubmit = (data: { name: string; email: string }) => { 
    alert(JSON.stringify(data, null, 2)); 
    setOpen(false); 
  };
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Form with Validation</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>User Details</Dialog.DialogTitle>
              <Dialog.DialogDescription>Fill in the form below.</Dialog.DialogDescription>
            </Dialog.DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name", { required: "Name is required" })} />
                {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
              </div>
            </div>
            <Dialog.DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </Dialog.DialogFooter>
          </form>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- image gallery modal ---------- */
function ImageGalleryModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Image Gallery</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-5xl">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Gallery</Dialog.DialogTitle>
            <Dialog.DialogDescription>Select images to include.</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-md overflow-hidden bg-slate-100">
                <img 
                  src={`https://picsum.photos/seed/${i}/300/300`} 
                  alt={`Gallery image ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <Dialog.DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Select</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- scroll modal ---------- */
function ScrollModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Scrollable Content</Button>
      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Long Content</Dialog.DialogTitle>
            <Dialog.DialogDescription>Scroll to see more content.</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div className="space-y-4 py-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-md">
                <h3 className="font-medium">Section {i + 1}</h3>
                <p className="text-sm text-slate-600 mt-1">This is some scrollable content in a modal.</p>
              </div>
            ))}
          </div>
          <Dialog.DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

/* ---------- main page ---------- */
export default function ModalShowcase() {
  return (
    <main className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">shadcn/ui Modal Gallery</h1>

      <Section title="Basic Dialogs">
        <BasicModal />
        <ScrollModal />
        <NestedModal />
      </Section>

      <Section title="Forms &amp; Inputs">
        <LoginFormModal />
        <FormValidationModal />
        <FileUploadModal />
      </Section>

      <Section title="Specialty Modals">
        <ConfirmModal />
        <SheetModal />
      </Section>

      <Section title="Content Rich">
        <ImageGalleryModal />
        <BadgeListModal />
        <TabsModal />
        <AccordionModal />
      </Section>

      <Section title="Interactive Inside">
        <TooltipModal />
        <PopoverModal />
        <LoadingModal />
      </Section>
    </main>
  );
}