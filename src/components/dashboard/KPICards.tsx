"use client";

import { useGetKPIsQuery } from "../../store/api";
import Card from "../ui/Card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  FileText,
  UserX,
} from "lucide-react";
import { clsx } from "clsx";

const kpiData = [
  {
    key: "totalEmployees",
    title: "Total Employees",
    icon: <Users className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    cat: "Employee",
  },
  {
    key: "jobView",
    title: "Job View",
    icon: <Eye className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
    cat: "Viewers",
  },
  {
    key: "jobApplied",
    title: "Job Applied",
    icon: <FileText className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    cat: "Applicants",
  },
  {
    key: "resigned",
    title: "Resigned Employees",
    icon: <UserX className="h-6 w-6" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    cat: "Employee",
  },
];

export default function KPICards() {
  const { data: kpis, isLoading, error } = useGetKPIsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((e, i) => (
          <Card key={i} className="animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 border border-[#D6F6EE] rounded w-24 mb-2"></div>
                <div className="h-8 border border-[#D6F6EE] rounded w-16"></div>
              </div>
              <div className="w-12 h-12 border border-[#D6F6EE] rounded-lg"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !kpis) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.key}>
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              Error loading data
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((k) => {
        const value = kpis[k.key as keyof typeof kpis] as number;
        const trend = kpis.trends.find((t) => t.kpi === k.key);

        return (
          <Card key={k.key}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justicy-center items-center gap-2">
                  <p className="text-sm font-medium text-black">{k.title}</p>
                  {trend && (
                    <div
                      className={`flex items-center px-1.5 py-1 ${
                        trend.dir === "up" ? "bg-[#D6F6EE]" : "bg-[#f6dcd6]"
                      } rounded-full`}>
                      {trend.dir === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={clsx("text-[13px] font-medium", {
                          "text-green-600": trend.dir === "up",
                          "text-red-600": trend.dir === "down",
                        })}>
                        {trend.pct}%
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {value.toLocaleString()}
                </p>
                <p className="text-[13px] font-normal text-gray-400 mt-2">
                  {k.cat}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
