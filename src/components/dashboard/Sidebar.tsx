import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Plane,
  Briefcase,
  Users,
  GraduationCap,
  Settings,
  HelpCircle,
  Menu,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      id: "flights",
      label: "Flight Management",
      icon: <Plane size={20} />,
      path: "/flights",
    },
    {
      id: "baggage",
      label: "Baggage Tracking",
      icon: <Briefcase size={20} />,
      path: "/baggage",
    },
    {
      id: "passengers",
      label: "Passenger Experience",
      icon: <Users size={20} />,
      path: "/passengers",
    },
    {
      id: "training",
      label: "Training",
      icon: <GraduationCap size={20} />,
      path: "/training",
    },
  ];

  const bottomMenuItems = [
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle size={20} />,
      path: "/help",
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Plane className="text-blue-400" />
            <span className="font-bold text-lg">AviationIQ</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <Menu size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <TooltipProvider
              key={item.id}
              delayDuration={collapsed ? 100 : 1000}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      activeItem === item.id
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white",
                      collapsed && "justify-center px-2",
                    )}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </ScrollArea>

      <div className="mt-auto border-t border-slate-700 pt-4 pb-6 px-2 space-y-1">
        {bottomMenuItems.map((item) => (
          <TooltipProvider key={item.id} delayDuration={collapsed ? 100 : 1000}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    activeItem === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                    collapsed && "justify-center px-2",
                  )}
                  onClick={() => setActiveItem(item.id)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}

        <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 mt-4 text-red-400 hover:bg-red-900/20 hover:text-red-300",
                  collapsed && "justify-center px-2",
                )}
              >
                <LogOut size={20} />
                {!collapsed && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
