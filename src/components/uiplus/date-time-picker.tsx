"use client";

import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Label } from "~/components/ui/label";

/* ---------- 单个日期 ---------- */
export function SingleDatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
}: {
  value?: Date;
  onChange?: (d?: Date) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[240px] justify-start text-left font-normal", !value && "text-muted-foreground")}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

/* ---------- 日期 + 时间 ---------- */
export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick date & time",
}: {
  value?: Date;
  onChange?: (d?: Date) => void;
  placeholder?: string;
}) {
  const [time, setTime] = useState(value ? format(value, "HH:mm") : "00:00");

  useEffect(() => {
    if (!value) return;
    const [h, m] = time.split(":").map(Number);
    const cloned = new Date(value);
    cloned.setHours(h, m, 0, 0);
    onChange?.(cloned);
  }, [time, value]);

  return (
    <div className="flex items-center gap-2">
      <SingleDatePicker value={value} onChange={onChange} placeholder={placeholder} />
      <input
        type="time"
        className="h-10 rounded-md border px-3"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </div>
  );
}

/* ---------- 日期范围 ---------- */
export function DateRangePicker({
  from,
  to,
  onChange,
  placeholder = "Pick a range",
}: {
  from?: Date;
  to?: Date;
  onChange?: (range: { from?: Date; to?: Date }) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[280px] justify-start text-left font-normal", !from && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {from ? (
            to ? (
              <>
                {format(from, "LLL dd, y")} - {format(to, "LLL dd, y")}
              </>
            ) : (
              format(from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={{ from, to }}
          onSelect={(range) => onChange?.({ from: range?.from, to: range?.to })}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

/* ---------- 日期时间范围 ---------- */
export function DateTimeRangePicker({
  from,
  to,
  onChange,
}: {
  from?: Date;
  to?: Date;
  onChange?: (range: { from?: Date; to?: Date }) => void;
}) {
  const [timeFrom, setTimeFrom] = useState(from ? format(from, "HH:mm") : "00:00");
  const [timeTo, setTimeTo] = useState(to ? format(to, "HH:mm") : "23:59");

  useEffect(() => {
    if (!from || !to) return;
    const [h1, m1] = timeFrom.split(":").map(Number);
    const [h2, m2] = timeTo.split(":").map(Number);
    const f = new Date(from);
    const t = new Date(to);
    f.setHours(h1, m1, 0, 0);
    t.setHours(h2, m2, 0, 0);
    onChange?.({ from: f, to: t });
  }, [from, to, timeFrom, timeTo]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Label className="w-12">From</Label>
        <SingleDatePicker
          value={from}
          onChange={(d) => onChange?.({ from: d, to })}
          placeholder="Start date"
        />
        <input
          type="time"
          className="h-10 rounded-md border px-3"
          value={timeFrom}
          onChange={(e) => setTimeFrom(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="w-12">To</Label>
        <SingleDatePicker
          value={to}
          onChange={(d) => onChange?.({ from, to: d })}
          placeholder="End date"
        />
        <input
          type="time"
          className="h-10 rounded-md border px-3"
          value={timeTo}
          onChange={(e) => setTimeTo(e.target.value)}
        />
      </div>
    </div>
  );
}