"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAttendanceQuery } from "@/store/api";
import Table from "../ui/Table";

const AttendanceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const itemsPerPage = 4;

  const { data: attendanceData = [], isLoading } = useGetAttendanceQuery();

  const filteredData = useMemo(() => {
    let filtered = attendanceData;

    if (searchTerm) {
      filtered = filtered.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter !== "All") {
      filtered = filtered.filter(
        (employee) => employee.status === selectedFilter
      );
    }

    return filtered;
  }, [attendanceData, searchTerm, selectedFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden px-2">
      <div className="py-2 px-5 border-0 border-b border-gray-200 mx-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Employee Attendance
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 bg-[#FAFAFB] p-1.5 rounded-md border border-[#e8e8e8]">
              <button
                onClick={() => setSelectedFilter("All")}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  selectedFilter === "All"
                    ? "bg-white text-black border-purple-200 shadow"
                    : ""
                }`}>
                All
              </button>

              <button
                onClick={() => setSelectedFilter("Late")}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  selectedFilter === "Late"
                    ? "bg-white text-black border-purple-200 shadow"
                    : ""
                }`}>
                Late
              </button>
              <button
                onClick={() => setSelectedFilter("Day-off")}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  selectedFilter === "Day-off"
                    ? "bg-white text-black border-purple-200 shadow"
                    : ""
                }`}>
                Day-off
              </button>
            </div>
          </div>
        </div>
      </div>
      <Table paginatedData={paginatedData} />
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm rounded-md border ${
                    currentPage === page
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}>
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
