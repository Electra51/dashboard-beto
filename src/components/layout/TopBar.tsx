"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface TopBarProps {
  className?: string;
}

const TopBar = ({ className = "" }: TopBarProps) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className={`bg-white  mt-5 ${className}`}>
      <div className="flex items-center justify-between h-16 px-2">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Hello {user?.name} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">Good Morning</p>
        </div>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:none placeholder:text-gray-300"
              />
            </div>
          </form>

          <button className="relative bg-[#FAFAFB] p-3 text-gray-400 hover:text-gray-500 focus:outline-none rounded-lg">
            <Bell className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 px-1 py-0.5 rounded-[6px] border border-gray-200">
              <div className="flex-shrink-0">
                <div className="h-7 w-6 rounded bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-[13px] font-medium text-gray-700">
                  {user?.name}
                </div>
                <div className="text-[10px] text-gray-500">{user?.role}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <div className="border-t border-gray-200 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default TopBar;
