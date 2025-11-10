"use client";

import { useState } from "react";
import {
  Button,
  ButtonVariant,
} from "~/components/ui/button";
import {
  Plus,
  Download,
  Upload,
  Heart,
  Trash2,
  ChevronDown,
  Loader2,
} from "lucide-react";
import * as Popover from "~/components/ui/popover";
import { cn } from "~/lib/utils";

// Helper component for sections
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </section>
);

function Playground() {
  const [variant, setVariant] = useState<ButtonVariant>("default");
  const [size, setSize] = useState<"xs" | "sm" | "default" | "lg">("default");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <section className="mb-10 border rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Live Playground</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <label className="flex flex-col text-sm">
          Variant
          <select
            className="mt-1 border rounded px-2 py-1"
            value={variant}
            onChange={(e) => setVariant(e.target.value as ButtonVariant)}
          >
            <option value="default">default</option>
            <option value="destructive">destructive</option>
            <option value="outline">outline</option>
            <option value="secondary">secondary</option>
            <option value="ghost">ghost</option>
            <option value="link">link</option>
            {/* custom bootstrap-like */}
            <option value="success">success</option>
            <option value="warning">warning</option>
            <option value="info">info</option>
          </select>
        </label>

        <label className="flex flex-col text-sm">
          Size
          <select
            className="mt-1 border rounded px-2 py-1"
            value={size}
            onChange={(e) => setSize(e.target.value as "xs" | "sm" | "default" | "lg")}
          >
            <option value="xs">xs</option>
            <option value="sm">sm</option>
            <option value="default">default</option>
            <option value="lg">lg</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
          Disabled
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={loading}
            onChange={(e) => setLoading(e.target.checked)}
          />
          Loading
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant={variant}
          size={size === "xs" ? "sm" : size}
          disabled={disabled || loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Please wait" : "Click me"}
        </Button>
      </div>
    </section>
  );
}


/* ---------- dropdown popover ---------- */
function DropdownPopover() {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Popover open={open} onOpenChange={setOpen}>
      <Popover.PopoverTrigger asChild>
        <Button variant="outline">
          Actions
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-48 p-1">
        <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100">
          Edit
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100">
          Duplicate
        </button>
        <hr className="my-1" />
        <button className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50">
          Delete
        </button>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}

/* ---------- main page ---------- */
export default function ButtonShowcase() {
  return (
    <main className="max-w-5xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">shadcn/ui Button Gallery</h1>

      <Playground />

      <Section title="Bootstrap-like palette">
        <Button className="bg-blue-600 hover:bg-blue-700">Primary</Button>
        <Button className="bg-gray-600 hover:bg-gray-700">Secondary</Button>
        <Button className="bg-green-600 hover:bg-green-700">Success</Button>
        <Button className="bg-red-600 hover:bg-red-700">Danger</Button>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Warning</Button>
        <Button className="bg-cyan-500 hover:bg-cyan-600">Info</Button>
        <Button className="bg-slate-200 hover:bg-slate-300 text-black">Light</Button>
        <Button className="bg-gray-800 hover:bg-gray-900">Dark</Button>
        <Button variant="link">Link</Button>
      </Section>

      <Section title="Outline">
        <Button variant="outline">Primary</Button>
        <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
          Success
        </Button>
        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
          Danger
        </Button>
        <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
          Warning
        </Button>
      </Section>

      <Section title="Sizes">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        {/* extra-small via tailwind */}
        <Button className="h-7 px-2 text-xs">Extra Small</Button>
      </Section>

      <Section title="Icons">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </Button>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
        <Button variant="ghost" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </Section>

      <Section title="Loading & Disabled">
        <Button disabled>Disabled</Button>
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
        <Button variant="outline" className="bg-slate-100" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </Button>
      </Section>

      <Section title="Block (full-width)">
        <Button className="w-full">Full width button</Button>
        <Button variant="outline" className="w-full">
          Outline full width
        </Button>
      </Section>

      <Section title="Button group">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button variant="outline" className="rounded-r-none border-r-0">
            Left
          </Button>
          <Button variant="outline" className="rounded-none border-r-0">
            Middle
          </Button>
          <Button variant="outline" className="rounded-l-none">
            Right
          </Button>
        </div>
      </Section>

      <Section title="Toolbar">
        <div className="flex items-center gap-2 p-2 border rounded-lg w-fit">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border" />
          <DropdownPopover />
        </div>
      </Section>
    </main>
  );
}
