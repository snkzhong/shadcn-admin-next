'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import type { DateRange } from 'react-day-picker';

// Helper: 格式化日期显示
const formatDate = (date: Date | undefined) => (date ? format(date, 'PPP') : '');
const formatDateTime = (date: Date | undefined) => (date ? format(date, 'PPP p') : '');

export default function DatePickerDemoPage() {
  // 单个日期
  const [singleDate, setSingleDate] = useState<Date>();
  const [singleDateOpen, setSingleDateOpen] = useState(false);

  // 时间（仅小时分钟）
  const [time, setTime] = useState<{ hour: number; minute: number }>({ hour: 12, minute: 0 });

  // 日期 + 时间
  const [dateTime, setDateTime] = useState<Date>();
  const [dateTimeOpen, setDateTimeOpen] = useState(false);

  // 日期范围
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [dateRangeOpen, setDateRangeOpen] = useState(false);

  return (
    <div className="p-8 space-y-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Date Picker Examples</h1>

      {/* 1. Single Date */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Single Date</h2>
        <Popover open={singleDateOpen} onOpenChange={setSingleDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !singleDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {singleDate ? formatDate(singleDate) : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={singleDate}
              onSelect={(date) => {
                setSingleDate(date);
                setSingleDateOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p className="mt-2 text-sm text-gray-500">
          Selected: {singleDate ? formatDate(singleDate) : 'None'}
        </p>
      </div>

      {/* 2. Time Only (Hour & Minute) */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Time Only</h2>
        <div className="flex items-center gap-2">
          <Select
            value={time.hour.toString()}
            onValueChange={(value) => setTime({ ...time, hour: parseInt(value) })}
          >
            <SelectTrigger className="w-[120px]">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={time.minute.toString()}
            onValueChange={(value) => setTime({ ...time, minute: parseInt(value) })}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Selected Time: {`${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`}
        </p>
      </div>

      {/* 3. Date + Time */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Date and Time</h2>
        <Popover open={dateTimeOpen} onOpenChange={setDateTimeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !dateTime && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTime ? formatDateTime(dateTime) : 'Pick date & time'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateTime}
              onSelect={(date) => {
                if (date) {
                  const newDateTime = new Date(date);
                  newDateTime.setHours(time.hour, time.minute, 0, 0);
                  setDateTime(newDateTime);
                } else {
                  setDateTime(undefined);
                }
                setDateTimeOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p className="mt-2 text-sm text-gray-500">
          Selected: {dateTime ? formatDateTime(dateTime) : 'None'}
        </p>
      </div>

      {/* 4. Date Range */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Date Range</h2>
        <Popover open={dateRangeOpen} onOpenChange={setDateRangeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !dateRange?.from && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  `${format(dateRange.from, 'LLL dd, y')} - ${format(dateRange.to, 'LLL dd, y')}`
                ) : (
                  format(dateRange.from, 'LLL dd, y')
                )
              ) : (
                'Pick a date range'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                const safeRange = range ?? { from: undefined, to: undefined };
                if (safeRange.from && safeRange.to) {
                  setDateRange(safeRange);
                  setDateRangeOpen(false);
                } else {
                  setDateRange(safeRange); // ✅ 始终是 DateRange 类型
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p className="mt-2 text-sm text-gray-500">
          From: {dateRange.from ? formatDate(dateRange.from) : '—'}<br />
          To: {dateRange.to ? formatDate(dateRange.to) : '—'}
        </p>
      </div>
    </div>
  );
}