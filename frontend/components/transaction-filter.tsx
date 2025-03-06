"use client"

import * as React from "react"
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

const stockTypes = [
  { value: "all", label: "全部股票" },
  { value: "a-shares", label: "A股" },
  { value: "hk-stocks", label: "港股" },
  { value: "us-stocks", label: "美股" },
  { value: "funds", label: "基金" },
]

export function TransactionFilter() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("all")
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 5, 1), // 2023年6月1日
    to: new Date(2023, 5, 30), // 2023年6月30日
  })

  return (
    <div className="flex flex-wrap gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
            {value ? stockTypes.find((type) => type.value === value)?.label : "选择股票类型"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="搜索股票类型..." />
            <CommandList>
              <CommandEmpty>未找到结果</CommandEmpty>
              <CommandGroup>
                {stockTypes.map((type) => (
                  <CommandItem
                    key={type.value}
                    value={type.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === type.value ? "opacity-100" : "opacity-0")} />
                    {type.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd")} - {format(date.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd")
              )
            ) : (
              <span>选择日期范围</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={zhCN}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

