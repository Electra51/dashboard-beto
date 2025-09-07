import { NextResponse } from "next/server";

export async function GET() {
  const mockData = {
    composition: [
      { label: "Male", value: 35 },
      { label: "Female", value: 65 },
    ],
    sources: [
      { label: "Direct", value: 25 },
      { label: "Wework", value: 35 },
      { label: "LinkedIn", value: 30 },
      { label: "Hired", value: 45 },
      { label: "Internal", value: 15 },
      { label: "Referral", value: 40 },
      { label: "Others", value: 32 },
    ],
  };

  return NextResponse.json(mockData);
}
