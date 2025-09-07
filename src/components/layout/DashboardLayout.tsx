/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout = ({
  children,
  className = "",
}: DashboardLayoutProps) => {
  const { requireAuth, user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!requireAuth()) {
      router.push("/login");
    }
  }, []);
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${className}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
