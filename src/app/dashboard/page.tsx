import React from "react";
import AttendanceTable from "@/components/dashboard/AttendanceTable";
import Charts from "@/components/dashboard/Charts";
import KPICards from "@/components/dashboard/KPICards";
import DashboardLayout from "@/components/layout/DashboardLayout";
const DashBoardPage = () => {
  return (
    <DashboardLayout>
      <KPICards />
      <div className="my-6">
        <Charts />
      </div>
      <AttendanceTable />
    </DashboardLayout>
  );
};

export default DashBoardPage;
