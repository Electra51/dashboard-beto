export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  joinDate?: string;
  status?: "active" | "inactive" | "pending";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface KPIData {
  totalEmployees: number;
  jobView: number;
  jobApplied: number;
  resigned: number;
  trends: {
    kpi: string;
    dir: "up" | "down";
    pct: number;
  }[];
}

export interface ChartData {
  composition: { label: string; value: number }[];
  sources: { label: string; value: number }[];
}

export interface AttendanceRow {
  id: string;
  employeeId: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  role: string;
  reimbursement: number;
  status: "On-Time" | "Sick Leave" | "Late";
}
