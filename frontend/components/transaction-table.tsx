"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// 定义交易记录类型
type Transaction = {
  id: string
  stockCode: string
  stockName: string
  date: string
  type: "买入" | "卖出"
  price: number
  quantity: number
  amount: number
  profit?: number
  profitPercentage?: number
}

// 模拟数据
const transactions: Transaction[] = [
  {
    id: "TR001",
    stockCode: "600519",
    stockName: "贵州茅台",
    date: "2023-06-15",
    type: "买入",
    price: 1800.5,
    quantity: 10,
    amount: 18005.0,
  },
  {
    id: "TR002",
    stockCode: "000858",
    stockName: "五粮液",
    date: "2023-06-14",
    type: "买入",
    price: 180.25,
    quantity: 100,
    amount: 18025.0,
  },
  {
    id: "TR003",
    stockCode: "600519",
    stockName: "贵州茅台",
    date: "2023-06-20",
    type: "卖出",
    price: 1850.0,
    quantity: 10,
    amount: 18500.0,
    profit: 495.0,
    profitPercentage: 2.75,
  },
  {
    id: "TR004",
    stockCode: "601318",
    stockName: "中国平安",
    date: "2023-06-10",
    type: "买入",
    price: 45.8,
    quantity: 500,
    amount: 22900.0,
  },
  {
    id: "TR005",
    stockCode: "601318",
    stockName: "中国平安",
    date: "2023-06-25",
    type: "卖出",
    price: 44.5,
    quantity: 500,
    amount: 22250.0,
    profit: -650.0,
    profitPercentage: -2.84,
  },
  {
    id: "TR006",
    stockCode: "600036",
    stockName: "招商银行",
    date: "2023-06-12",
    type: "买入",
    price: 35.6,
    quantity: 600,
    amount: 21360.0,
  },
  {
    id: "TR007",
    stockCode: "000333",
    stockName: "美的集团",
    date: "2023-06-18",
    type: "买入",
    price: 65.2,
    quantity: 300,
    amount: 19560.0,
  },
  {
    id: "TR008",
    stockCode: "000333",
    stockName: "美的集团",
    date: "2023-06-28",
    type: "卖出",
    price: 68.5,
    quantity: 300,
    amount: 20550.0,
    profit: 990.0,
    profitPercentage: 5.06,
  },
  {
    id: "TR009",
    stockCode: "600276",
    stockName: "恒瑞医药",
    date: "2023-06-05",
    type: "买入",
    price: 32.4,
    quantity: 800,
    amount: 25920.0,
  },
  {
    id: "TR010",
    stockCode: "600276",
    stockName: "恒瑞医药",
    date: "2023-06-30",
    type: "卖出",
    price: 34.2,
    quantity: 800,
    amount: 27360.0,
    profit: 1440.0,
    profitPercentage: 5.56,
  },
]

// 定义表格列
const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "stockCode",
    header: "股票代码",
    cell: ({ row }) => <div className="font-medium">{row.getValue("stockCode")}</div>,
  },
  {
    accessorKey: "stockName",
    header: "股票名称",
    cell: ({ row }) => <div>{row.getValue("stockName")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          交易日期
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "type",
    header: "交易类型",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge
          variant={type === "买入" ? "outline" : "default"}
          className={cn(type === "买入" ? "border-blue-500 text-blue-500" : "bg-primary text-primary-foreground")}
        >
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "price",
    header: "价格",
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("zh-CN", {
        style: "currency",
        currency: "CNY",
      }).format(price)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "quantity",
    header: "数量",
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("quantity")}</div>
    },
  },
  {
    accessorKey: "amount",
    header: "金额",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("zh-CN", {
        style: "currency",
        currency: "CNY",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "profit",
    header: "盈亏",
    cell: ({ row }) => {
      const profit = row.original.profit
      if (profit === undefined) return null

      const formatted = new Intl.NumberFormat("zh-CN", {
        style: "currency",
        currency: "CNY",
        signDisplay: "always",
      }).format(profit)

      return (
        <div className={cn("text-right font-medium", profit > 0 ? "text-green-600" : profit < 0 ? "text-red-600" : "")}>
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "profitPercentage",
    header: "收益率",
    cell: ({ row }) => {
      const percentage = row.original.profitPercentage
      if (percentage === undefined) return null

      return (
        <div
          className={cn(
            "text-right font-medium",
            percentage > 0 ? "text-green-600" : percentage < 0 ? "text-red-600" : "",
          )}
        >
          {percentage > 0 ? "+" : ""}
          {percentage.toFixed(2)}%
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">打开菜单</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction.id)}>
              复制交易ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>查看详情</DropdownMenuItem>
            <DropdownMenuItem>编辑记录</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">删除记录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface TransactionTableProps {
  type?: "buy" | "sell"
}

export function TransactionTable({ type }: TransactionTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  // 根据类型筛选数据
  const filteredData = React.useMemo(() => {
    if (!type) return transactions
    return transactions.filter(
      (transaction) =>
        (type === "buy" && transaction.type === "买入") || (type === "sell" && transaction.type === "卖出"),
    )
  }, [type])

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="搜索股票代码或名称..."
          value={(table.getColumn("stockName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("stockName")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  暂无记录
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          第 <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> 页，共{" "}
          <span className="font-medium">{table.getPageCount()}</span> 页
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          上一页
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          下一页
        </Button>
      </div>
    </div>
  )
}

