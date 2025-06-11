
import * as React from "react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

interface EnhancedTableProps {
  priority?: "high" | "medium" | "low"
  children: React.ReactNode
  className?: string
}

export function EnhancedTable({ priority = "medium", children, className, ...props }: EnhancedTableProps) {
  const priorityStyles = {
    high: "border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-blue-50/50 shadow-xl rounded-xl overflow-hidden",
    medium: "border border-gray-200 bg-white/95 shadow-lg rounded-lg overflow-hidden",
    low: "border border-gray-100 bg-white/80 shadow-md rounded-md overflow-hidden"
  }

  return (
    <div className={cn("relative backdrop-blur-sm", priorityStyles[priority], className)}>
      <Table {...props}>
        {children}
      </Table>
    </div>
  )
}

interface EnhancedTableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  priority?: "high" | "medium" | "low"
}

export function EnhancedTableHeader({ priority = "medium", className, ...props }: EnhancedTableHeaderProps) {
  const priorityStyles = {
    high: "bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white [&_th]:text-white [&_th]:font-bold [&_th]:text-base",
    medium: "bg-gradient-to-r from-gray-50 to-gray-100 [&_th]:text-gray-800 [&_th]:font-semibold",
    low: "bg-gray-50/50 [&_th]:text-gray-600 [&_th]:font-medium"
  }

  return (
    <TableHeader className={cn(priorityStyles[priority], className)} {...props} />
  )
}

interface EnhancedTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  priority?: "high" | "medium" | "low"
  isSelected?: boolean
}

export function EnhancedTableRow({ priority = "medium", isSelected, className, ...props }: EnhancedTableRowProps) {
  const priorityStyles = {
    high: "hover:bg-purple-50/70 transition-all duration-200 hover:shadow-md border-b border-purple-100/50",
    medium: "hover:bg-gray-50/70 transition-colors duration-150 border-b border-gray-100",
    low: "hover:bg-gray-25 transition-colors duration-100 border-b border-gray-50"
  }

  const selectedStyles = isSelected ? "bg-purple-50 border-purple-200" : ""

  return (
    <TableRow className={cn(priorityStyles[priority], selectedStyles, className)} {...props} />
  )
}

interface EnhancedTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  priority?: "high" | "medium" | "low"
  highlight?: boolean
}

export function EnhancedTableCell({ priority = "medium", highlight, className, ...props }: EnhancedTableCellProps) {
  const priorityStyles = {
    high: "py-4 px-6 text-base",
    medium: "py-3 px-4 text-sm",
    low: "py-2 px-3 text-sm"
  }

  const highlightStyles = highlight ? "font-semibold text-purple-700 bg-purple-50/50" : ""

  return (
    <TableCell className={cn(priorityStyles[priority], highlightStyles, className)} {...props} />
  )
}
