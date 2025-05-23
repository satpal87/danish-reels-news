
"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function TubelightNavbar({ items, className }: NavBarProps) {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("")
  
  // Set active tab based on current location
  useEffect(() => {
    const currentPath = location.pathname
    const matchingItem = items.find(item => 
      item.url === currentPath || 
      (item.url !== '/' && currentPath.startsWith(item.url))
    )
    
    if (matchingItem) {
      setActiveTab(matchingItem.name)
    } else {
      // Default to home if no match
      const homeItem = items.find(item => item.url === '/')
      if (homeItem) setActiveTab(homeItem.name)
    }
  }, [location.pathname, items])

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        className,
      )}
    >
      <div className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 backdrop-blur-lg py-1.5 px-1.5 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative flex flex-col items-center justify-center px-4 py-2 rounded-full transition-colors",
                "text-gray-500 dark:text-gray-400",
                isActive ? "text-danish-red dark:text-danish-red" : "hover:text-danish-red dark:hover:text-danish-red"
              )}
            >
              <span className="relative z-10">
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </span>
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-red-50 dark:bg-red-900/20 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-danish-red dark:bg-danish-red rounded-t-full">
                    <div className="absolute w-10 h-5 bg-red-200/50 dark:bg-red-400/20 rounded-full blur-md -top-2 -left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
