import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { KPIData, ChartData, AttendanceRow } from "@/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["KPIs", "Charts", "Attendance"],
  endpoints: (builder) => ({
    getKPIs: builder.query<KPIData, void>({
      query: () => "/kpis",
      providesTags: ["KPIs"],
    }),
    getCharts: builder.query<ChartData, void>({
      query: () => "/charts",
      providesTags: ["Charts"],
    }),
    getAttendance: builder.query<AttendanceRow[], void>({
      query: () => "/attendance",
      providesTags: ["Attendance"],
    }),
  }),
});

export const { useGetKPIsQuery, useGetChartsQuery, useGetAttendanceQuery } =
  api;
