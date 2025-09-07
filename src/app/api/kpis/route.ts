import { NextResponse } from "next/server";

export async function GET() {
  const mockData = {
    totalEmployees: 856,
    jobView: 3342,
    jobApplied: 77,
    resigned: 17,
    trends: [
      { kpi: "totalEmployees", dir: "up" as const, pct: 10.0 },
      { kpi: "jobView", dir: "up" as const, pct: 22.0 },
      { kpi: "jobApplied", dir: "up" as const, pct: 12.0 },
      { kpi: "resigned", dir: "down" as const, pct: 7.0 },
    ],
  };

  return NextResponse.json(mockData);
}
