"use client"

import * as React from "react"
import { format } from "date-fns"
import { zhCN as DateFnsZHCN } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { zhCN as DayPickerZHCN } from "react-day-picker/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  value,
  disabled = false,
  onSelect
}: {
  value?: Date
  disabled?: boolean
  onSelect?: (value: Date | undefined) => void
}) {
  const [date, setDate] = React.useState<Date | undefined>(value)

  const handleSelect = (value: Date | undefined) => {
    setDate(value)
    onSelect && onSelect(value)
  }

  React.useEffect(() => {
    setDate(value)
  }, [value])

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {
            date
            ? format(date, "PPP", { locale: DateFnsZHCN })
            : <span>请选择日期</span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={(e) => handleSelect(e)} locale={DayPickerZHCN} />
      </PopoverContent>
    </Popover>
  )
}