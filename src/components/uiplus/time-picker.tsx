"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export interface TimePickerProps {
  time?: string
  onTimeChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
}

export function TimePicker({
  time,
  onTimeChange,
  placeholder = "Select time",
  disabled = false,
}: TimePickerProps) {
  const [hour, setHour] = React.useState(time?.split(':')[0] || '')
  const [minute, setMinute] = React.useState(time?.split(':')[1] || '')

  const handleHourChange = (value: string) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 23) {
      setHour(value.padStart(2, '0'))
    } else if (value === '') {
      setHour('')
    }
  }

  const handleMinuteChange = (value: string) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 59) {
      setMinute(value.padStart(2, '0'))
    } else if (value === '') {
      setMinute('')
    }
  }

  React.useEffect(() => {
    if (hour && minute && onTimeChange) {
      onTimeChange(`${hour}:${minute}`)
    }
  }, [hour, minute, onTimeChange])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          <Clock className="mr-2 h-4 w-4" />
          {time || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Time</h4>
            <p className="text-sm text-muted-foreground">
              Set the time for your event.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="hour">Hour</Label>
              <Input
                id="hour"
                type="number"
                min="0"
                max="23"
                value={hour}
                onChange={(e) => handleHourChange(e.target.value)}
                placeholder="00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minute">Minute</Label>
              <Input
                id="minute"
                type="number"
                min="0"
                max="59"
                value={minute}
                onChange={(e) => handleMinuteChange(e.target.value)}
                placeholder="00"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}