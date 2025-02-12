"use client"

import React from "react"

import { Inbox, Calendar } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { useSidebarCollapse } from "@/src/contexts/SidebarCollapseContext"
import classNames from "@/src/utils/classNames"
import { getCurrentWeek } from "@/src/utils/datetime"

const SidebarMainLink = ({
  href,
  icon,
  label,
  isActive,
  isCollapsed,
}: {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  isCollapsed: boolean
}) => {
  const activeClass = isActive && "text-foreground"
  return (
    <Link
      className={classNames(
        "hover-text flex items-center gap-2 font-medium min-h-5",
        activeClass
      )}
      href={href}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  )
}

export const SidebarMain: React.FC = () => {
  const pathname = usePathname()

  const weekNumber = getCurrentWeek(new Date())

  const { isCollapsed } = useSidebarCollapse()

  const today = String(new Date().getDate()).padStart(2, "0")

  return (
    <div className="flex flex-col gap-3.5">
      <SidebarMainLink
        href="/inbox"
        icon={<Inbox size={16} />}
        label="inbox"
        isActive={pathname.includes("/inbox")}
        isCollapsed={isCollapsed}
      />
      <SidebarMainLink
        href="/today"
        icon={<span>{today}</span>}
        label="today"
        isActive={pathname.includes("/today")}
        isCollapsed={isCollapsed}
      />
      <SidebarMainLink
        href="/this-week"
        icon={<Calendar size={16} />}
        label={`week ${weekNumber}`}
        isActive={pathname.includes("/this-week")}
        isCollapsed={isCollapsed}
      />
    </div>
  )
}
