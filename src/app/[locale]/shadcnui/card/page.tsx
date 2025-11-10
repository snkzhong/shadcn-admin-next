"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  Calendar,
  Users,
  X,
  ChevronDown,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import * as Tabs from "~/components/ui/tabs";
import * as Accordion from "~/components/ui/accordion";
import * as Popover from "~/components/ui/popover";
import { cn } from "~/lib/utils";

/* ---------- helpers ---------- */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="flex flex-wrap gap-6">{children}</div>
  </section>
);

const Rating = ({ value = 5 }: { value?: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))}
  </div>
);

/* ---------- closeable card ---------- */
function ClosableCard() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <Card className="relative w-80">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={() => setShow(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle>Dismissible Card</CardTitle>
        <CardDescription>Click the × to close this card.</CardDescription>
      </CardHeader>
      <CardContent>Any content you like.</CardContent>
    </Card>
  );
}

/* ---------- dropdown inside card ---------- */
function CardWithDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Card w/ Dropdown</CardTitle>
        <Popover.Popover open={open} onOpenChange={setOpen}>
          <Popover.PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </Popover.PopoverTrigger>
          <Popover.PopoverContent className="w-40 p-1">
            <button className="w-full px-3 py-2 text-left rounded hover:bg-slate-100">Edit</button>
            <button className="w-full px-3 py-2 text-left rounded hover:bg-slate-100">Duplicate</button>
            <Separator />
            <button className="w-full px-3 py-2 text-left rounded text-red-600 hover:bg-red-50">Delete</button>
          </Popover.PopoverContent>
        </Popover.Popover>
      </CardHeader>
      <CardContent>More content here.</CardContent>
    </Card>
  );
}

/* ---------- main page ---------- */
export default function CardShowcase() {
  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-10">shadcn/ui Card Gallery</h1>

      <Section title="Basic Cards">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">The quick brown fox jumps over the lazy dog.</p>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>

        <Card className="w-80">
          <CardContent className="pt-6">
            <p>Body-only card with some text inside.</p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Horizontal Card">
        <Card className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60"
            alt="beach"
            className="md:col-span-1 h-48 md:h-auto object-cover rounded"
          />
          <div className="md:col-span-2 flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Horizontal Layout</CardTitle>
              <CardDescription>Image on the left, content on the right.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">Perfect for product or travel cards.</p>
            </CardContent>
            <CardFooter>
              <Button>Book now</Button>
            </CardFooter>
          </div>
        </Card>
      </Section>

      <Section title="Image Variants">
        <Card className="w-80">
          <img
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=60"
            alt="lake"
            className="h-48 object-cover rounded-t-md"
          />
          <CardHeader>
            <CardTitle>Top Image</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Image sits at the top of the card.</p>
          </CardContent>
        </Card>

        <Card className="w-80 relative text-white">
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=60"
            alt="city"
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/40 rounded-md" />
          <CardHeader className="relative">
            <CardTitle className="text-white">Background Image</CardTitle>
            <CardDescription className="text-white/80">With overlay</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <p>Content stays above the overlay.</p>
          </CardContent>
        </Card>
      </Section>

      <Section title="E-commerce Card">
        <Card className="w-80">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=60"
            alt="watch"
            className="h-48 object-cover rounded-t-md"
          />
          <CardHeader>
            <CardTitle>Classic Watch</CardTitle>
            <CardDescription>$249.00</CardDescription>
          </CardHeader>
          <CardContent>
            <Rating value={4} />
            <p className="text-sm text-slate-600 mt-2"> sleek design, water resistant.</p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Pricing Cards">
        {[{
          plan: "Starter",
          price: "$9",
          features: ["1 Project", "10 GB", "Email support"],
        }, {
          plan: "Pro",
          price: "$29",
          popular: true,
          features: ["10 Projects", "100 GB", "Priority support"],
        }, {
          plan: "Enterprise",
          price: "$99",
          features: ["Unlimited", "1 TB", "Dedicated manager"],
        }].map((p) => (
          <Card key={p.plan} className={cn("w-80 relative", p.popular && "border-blue-600 shadow-lg")}>
            {p.popular && (
              <Badge className="absolute -top-3 left-6">Most popular</Badge>
            )}
            <CardHeader>
              <CardTitle>{p.plan}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-slate-900">{p.price}</span> /mo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get started</Button>
            </CardFooter>
          </Card>
        ))}
      </Section>

      <Section title="User Profile Card">
        <Card className="w-80">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60"
            alt="cover"
            className="h-32 object-cover rounded-t-md"
          />
          <CardHeader className="flex items-center -mt-12">
            <Avatar className="h-20 w-20 ring-4 ring-white">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-3">John Doe</CardTitle>
            <CardDescription>Product Designer</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-around text-center">
            <div>
              <p className="text-xl font-bold">127</p>
              <p className="text-xs text-slate-600">Posts</p>
            </div>
            <div>
              <p className="text-xl font-bold">12.3k</p>
              <p className="text-xs text-slate-600">Followers</p>
            </div>
            <div>
              <p className="text-xl font-bold">847</p>
              <p className="text-xs text-slate-600">Following</p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="flex-1">Follow</Button>
            <Button variant="outline" className="flex-1">Message</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Interactive &amp; Dismissible">
        <ClosableCard />
        <CardWithDropdown />
        <Card className="w-80 group hover:shadow-xl hover:-translate-y-1 transition">
          <CardHeader>
            <CardTitle>Hover to Lift</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Add subtle elevation on hover.</p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Card with Tabs">
        <Card className="w-80">
          <Tabs.Tabs defaultValue="account">
            <Tabs.TabsList className="grid grid-cols-2">
              <Tabs.TabsTrigger value="account">Account</Tabs.TabsTrigger>
              <Tabs.TabsTrigger value="password">Password</Tabs.TabsTrigger>
            </Tabs.TabsList>
            <Tabs.TabsContent value="account" className="p-4">
              Change your account settings here.
            </Tabs.TabsContent>
            <Tabs.TabsContent value="password" className="p-4">
              Change your password here.
            </Tabs.TabsContent>
          </Tabs.Tabs>
        </Card>
      </Section>

      <Section title="Card with Accordion">
        <Card className="w-80">
          <Accordion.Accordion type="single" collapsible>
            <Accordion.AccordionItem value="item-1">
              <Accordion.AccordionTrigger>Is it accessible?</Accordion.AccordionTrigger>
              <Accordion.AccordionContent>Yes. It adheres to WAI-ARIA.</Accordion.AccordionContent>
            </Accordion.AccordionItem>
            <Accordion.AccordionItem value="item-2">
              <Accordion.AccordionTrigger>Can I customize it?</Accordion.AccordionTrigger>
              <Accordion.AccordionContent>
                Absolutely. Styles are fully customizable with Tailwind.
              </Accordion.AccordionContent>
            </Accordion.AccordionItem>
          </Accordion.Accordion>
        </Card>
      </Section>

      <Section title="Skeleton Loading Card">
        <Card className="w-80">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-slate-200" />
              </Avatar>
              <div className="h-4 w-32 bg-slate-200 rounded" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Responsive Card Grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="hover:shadow-lg transition">
              <img
                src={`https://picsum.photos/seed/ocean${i}/800/0?fit=cover`}
                alt="random"
                className="h-40 object-cover rounded-t-md"
              />
              <CardHeader>
                <CardTitle>Card {i + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Auto-fit responsive grid.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
