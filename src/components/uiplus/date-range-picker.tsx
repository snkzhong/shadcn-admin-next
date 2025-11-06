"use client";

import { useState, useEffect } from "react";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "~/lib/utils";

// 定义日期范围类型
export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

interface DateRangePickerProps {
  className?: string;
  placeholder?: string;
  value?: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({
  className = "",
  placeholder = "Select date range",
  value,
  onChange,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  // 确保tempRange始终被初始化为有效的对象
  const [tempRange, setTempRange] = useState<DateRange>({
    from: value?.from,
    to: value?.to
  });

  // 当外部值变化时同步内部状态，增加空值检查
  useEffect(() => {
    if (value) {
      setTempRange({
        from: value.from,
        to: value.to
      });
    }
  }, [value]);

  // 处理日期选择
  const handleSelect = (date: Date) => {
    // 确保tempRange是有效的对象
    if (!tempRange) return;
    
    if (!tempRange.from) {
      // 选择开始日期
      const newRange = { from: date, to: undefined };
      setTempRange(newRange);
    } else if (!tempRange.to && date >= tempRange.from) {
      // 选择结束日期并关闭
      const newRange = { ...tempRange, to: date };
      setTempRange(newRange);
      onChange(newRange);
      setOpen(false);
    } else {
      // 重置并选择新的开始日期
      const newRange = { from: date, to: undefined };
      setTempRange(newRange);
    }
  };

  // 确认临时选择
  const confirmSelection = () => {
    if (tempRange) {
      onChange(tempRange);
      setOpen(false);
    }
  };

  // 重置选择
  const resetSelection = () => {
    const emptyRange = { from: undefined, to: undefined };
    setTempRange(emptyRange);
    onChange(emptyRange);
  };

  // 格式化显示的日期范围，增加全面的空值检查
  const formatDisplayText = () => {
    // 确保tempRange是有效的对象
    if (!tempRange) return placeholder;
    
    if (!tempRange.from) return placeholder;
    if (!tempRange.to) return `From ${format(tempRange.from, "PPP", { locale: enUS })}`;
    return `${format(tempRange.from, "PPP", { locale: enUS })} - ${format(tempRange.to, "PPP", { locale: enUS })}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(`w-full text-left justify-start`, !value && "text-muted-foreground", className)}
        >
          {formatDisplayText()}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range" 
          captionLayout="dropdown" 
          // 增加空值检查，确保不会传递undefined
          selected={tempRange ? { from: tempRange.from, to: tempRange.to } : undefined}
          onSelect={(range) => {
            console.log("range:", range);
            if (range?.from && range?.to) setTempRange({ from: undefined, to: undefined });
            if (range?.from) handleSelect(range.from);
            if (range?.to) handleSelect(range.to);
          }}
          initialFocus
          className="rounded-md border"
          locale={enUS} 
          numberOfMonths={2}
        />
        {tempRange?.from && (
          <div className="flex items-center justify-between p-4 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetSelection}
              className="text-sm"
            >
              Reset
            </Button>
            {!tempRange.to && (
              <Button 
                size="sm" 
                onClick={confirmSelection}
                className="text-sm"
              >
                Only start date
              </Button>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
