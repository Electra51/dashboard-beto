"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  NotepadText,
  CircleDollarSign,
  UserPlus,
  Gauge,
  ClipboardList,
  Headset,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSidebarCollapsed } from "@/hooks/useLocalStorage";
import { SIDEBAR_ITEMS } from "@/utils/constants";
import logo from "../../assets/logo.png";
import Image from "next/image";

const iconMap = {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  NotepadText,
  CircleDollarSign,
  UserPlus,
  Gauge,
  ClipboardList,
  Headset,
  Settings,
} as const;

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useSidebarCollapsed();

  const mainItems = SIDEBAR_ITEMS.filter((item) => !item.isOther);
  const otherItems = SIDEBAR_ITEMS.filter((item) => item.isOther);

  const isActive = (path: string) => pathname === path;

  type SidebarItemType = {
    id: string;
    label: string;
    path: string;
    icon: keyof typeof iconMap;
    isOther?: boolean;
  };

  const SidebarItem = ({ item }: { item: SidebarItemType }) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
    const active = isActive(item.path);

    return (
      <Link
        href={item.path}
        className={`
          flex items-center px-3 py-2.5 text-sm font-medium rounded-r-lg transition-colors
          ${
            active
              ? "bg-[#FFF2E8] text-[#F69348] border-l-3 border-[#F69348]"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }
          ${collapsed ? "justify-center" : "justify-start"}
        `}
        title={collapsed ? item.label : ""}>
        <IconComponent
          className={`h-5 w-5 ${collapsed ? "" : "mr-3"} flex-shrink-0`}
        />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    );
  };

  return (
    <div className="bg-white">
      <div
        className={`
      bg-[#FAFAFB] flex flex-col transition-all duration-300 my-4 mx-6
      ${collapsed ? "w-16 rounded-[12px]" : "w-64 rounded-[20px]"}
      ${className}
    `}>
        <div className="flex items-center justify-center">
          {!collapsed ? (
            <div className="flex items-center justify-center mt-3">
              <Image src={logo} alt="company logo" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-8 h-8 bg-[#F69348] rounded-lg mx-auto mt-4">
              <span className="text-white text-lg font-bold">B</span>
            </div>
          )}
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="space-y-1">
            {mainItems.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </div>

          {otherItems.length > 0 && (
            <div className="pt-14">
              {!collapsed && (
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Other
                  </h3>
                </div>
              )}
              <div className="space-y-1">
                {otherItems.map((item) => (
                  <SidebarItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
