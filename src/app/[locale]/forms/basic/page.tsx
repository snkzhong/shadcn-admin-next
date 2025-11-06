"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { DateRangePicker, DateRange } from "~/components/uiplus/date-range-picker";
import { Separator } from "~/components/ui/separator";
import { Label } from "~/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "~/components/ui/radio-group";
import { Checkbox } from "~/components/ui/checkbox";
import { Switch } from "~/components/ui/switch";

/* ---------------- validation schema ---------------- */
const formSchema = z.object({
  username: z.string().min(2, "At least 2 characters"),
  search: z.string().optional(),
  email: z.string().email("Invalid email"),
  url: z.string().url("Invalid URL").optional(),
  password: z.string().min(6, "At least 6 characters"),
  number: z.number().min(0, "Must be ≥ 0"),
  date: z.date().refine((val) => val !== null && !isNaN(val.getTime()), {
    message: "Please pick a valid date",
  }),
  time: z.string().min(1, "Pick a time"),
  color: z.string(),
  fruit: z.string().nonempty("Select a fruit"),
  textarea: z.string().max(200, "Max 200 characters"),
  date_range: z.custom<DateRange | undefined>().optional(),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const fruits = ["Apple", "Banana", "Orange", "Watermelon", "Grape"];

export default function FormBasicPage() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const formInline = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:{
    },
  });

  const formHorizontal = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });

  const formVertical = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });

  function onSubmit(values: FormValues) {
    console.log("Submit data:", values);
  }

  /* --------------- reusable grid wrapper --------------- */
  const GridItem = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-5">{children}</div>
  );

  return (
    <main className="mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">Inline Layout Form</h1>

      <Form {...formInline}>
        <form onSubmit={formInline.handleSubmit(onSubmit)} className="flex gap-x-4 gap-y-5">
          <FormField
            control={formInline.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex gap-2">
                <FormLabel>Username</FormLabel>
                <div className="relative form-content flex gap-2">
                <FormControl>
                  <Input className="w-fit" placeholder="username" {...field} />
                </FormControl>
                <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={formInline.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex gap-2">
                <FormLabel>Email</FormLabel>
                <div className="relative form-content flex gap-2">
                <FormControl>
                  <Input className="w-fit" type="email" {...field} />
                </FormControl>
                <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={formInline.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex gap-2">
                <FormLabel>Address</FormLabel>
                <div className="relative form-content">
                <FormControl>
                  <Input className="w-fit" placeholder="" {...field} />
                </FormControl>
                <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                </div>
              </FormItem>
            )}
          />

          <div>
            <Button type="reset" variant="ghost" className="mr-4" onClick={() => formInline.reset()}>reset</Button>

            <Button type="submit">Submit</Button>
          </div>

        </form>
      </Form>

      <Separator className="my-4" />


      <h1 className="text-2xl font-semibold mb-6">Horizontal Layout Form</h1>

      <Form {...formHorizontal}>
        <form onSubmit={formHorizontal.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {/* ------------ Col-1 ------------ */}

            <FormField
              control={formHorizontal.control}
              name="username"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Username</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="email"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Email</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="password"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Password</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="number"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Quantity</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="date"
              render={({ field }) => (
                <FormItem className="form-item-horizontal flex flex-col">
                  <FormLabel className="form-label">Date</FormLabel>
                  <div className="relative form-content">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single" 
                        captionLayout="dropdown" 
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="date_range"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Date range</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <DateRangePicker className="w-full" value={range} onChange={setRange} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />


            <FormField
              control={formHorizontal.control}
              name="search"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Search</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input placeholder="Keywords…" {...field} />
                  </FormControl>
                  {/*<FormDescription>Optional search field</FormDescription>*/}
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="url"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Website</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input type="url" placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="time"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Time</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="color"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Theme Color</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input type="color" className="w-16 h-10 p-1" {...field} />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="fruit"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Favorite Fruit</FormLabel>
                  <div className="relative form-content">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fruits.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formHorizontal.control}
              name="textarea"
              render={({ field }) => (
                <FormItem className="form-item-horizontal">
                  <FormLabel className="form-label">Remarks</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Textarea placeholder="Anything else…" className="resize-y" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

          {/* ------------ Submit ------------ */}
          <div className="md:col-span-2 flex justify-end">
            <Button type="reset" variant="outline" className="mr-4" onClick={() => formHorizontal.reset()}>reset</Button>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>


      <Separator className="my-4" />

      <h1 className="text-2xl font-semibold mb-6">Vertical Layout Form</h1>

      <Form {...formVertical}>
        <form onSubmit={formVertical.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {/* ------------ Col-1 ------------ */}

            <FormField
              control={formVertical.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Username</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Email</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Password</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Quantity</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Date</FormLabel>
                  <div className="relative form-content">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single" 
                        captionLayout="dropdown" 
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="date_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Date range</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <DateRangePicker className="w-full" value={range} onChange={setRange} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />


            <FormField
              control={formVertical.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Search</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input placeholder="Keywords…" {...field} />
                  </FormControl>
                  {/*<FormDescription>Optional search field</FormDescription>*/}
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Website</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input type="url" placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Time</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Theme Color</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input type="color" className="w-16 h-10 p-1" {...field} />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="fruit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Favorite Fruit</FormLabel>
                  <div className="relative form-content">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fruits.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={formVertical.control}
              name="textarea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Remarks</FormLabel>
                  <div className="relative form-content">
                  <FormControl>
                    <Textarea placeholder="Anything else…" className="resize-y" {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 -mt-1 z-10 max-w-max px-2 py-1 text-xs bg-popover border shadow-md rounded" />
                  </div>
                </FormItem>
              )}
            />

          {/* ------------ Submit ------------ */}
          <div className="md:col-span-2 flex justify-end">
            <Button type="reset" variant="outline" className="mr-4" onClick={() => formVertical.reset()}>reset</Button>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>

      <Separator className="my-4" />

      <h1 className="text-2xl font-semibold mb-6">Radios</h1>

      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem disabled value="disabled" id="r4" />
          <Label htmlFor="r4">disabled</Label>
        </div>
      </RadioGroup>

      <Separator className="my-4" />

      <h1 className="text-2xl font-semibold mb-6">Checkboxes</h1>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox id="terms-2" defaultChecked />
          <div className="grid gap-2">
            <Label htmlFor="terms-2">Accept terms and conditions</Label>
            <p className="text-muted-foreground text-sm">
              By clicking this checkbox, you agree to the terms and conditions.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox id="toggle" disabled />
          <Label htmlFor="toggle">Enable notifications</Label>
        </div>
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <Checkbox
            id="toggle-2"
            defaultChecked
            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          />
          <div className="grid gap-1.5 font-normal">
            <p className="text-sm leading-none font-medium">
              Enable notifications
            </p>
            <p className="text-muted-foreground text-sm">
              You can enable or disable notifications at any time.
            </p>
          </div>
        </Label>
      </div>

      <Separator className="my-4" />

      <h1 className="text-2xl font-semibold mb-6">Switches</h1>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Switch id="ios" />
          <Label htmlFor="ios">ios</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="android" />
          <Label htmlFor="android">android</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="windows" />
          <Label htmlFor="windows">windows</Label>
        </div>

      </div>

    </main>
  );
}
