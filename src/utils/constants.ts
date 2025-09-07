// route
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  EMPLOYEES: "/employees",
  DEPARTMENTS: "/departments",
  ATTENDANCE: "/attendance",
  PAYROLL: "/payroll",
  RECRUITMENT: "/recruitment",
  PERFORMANCE: "/performance",
  LEAVES: "/leaves",
  HOLIDAYS: "/holidays",
  SUPPORT: "/support",
  SETTINGS: "/settings",
} as const;

// sidebar items
export const SIDEBAR_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: "LayoutDashboard",
    isOther: false,
  },
  {
    id: "employees",
    label: "Employees",
    path: ROUTES.EMPLOYEES,
    icon: "Users",
    isOther: false,
  },
  {
    id: "departments",
    label: "Departments",
    path: ROUTES.DEPARTMENTS,
    icon: "Building2",
    isOther: false,
  },
  {
    id: "attendance",
    label: "Attendance",
    path: ROUTES.ATTENDANCE,
    icon: "CalendarCheck",
    isOther: false,
  },
  {
    id: "payroll",
    label: "Payroll",
    path: ROUTES.PAYROLL,
    icon: "CircleDollarSign",
    isOther: false,
  },
  {
    id: "recruitment",
    label: "Recruitment",
    path: ROUTES.RECRUITMENT,
    icon: "UserPlus",
    isOther: false,
  },
  {
    id: "performance",
    label: "Performance",
    path: ROUTES.PERFORMANCE,
    icon: "Gauge",
    isOther: false,
  },
  {
    id: "leaves",
    label: "Leaves",
    path: ROUTES.LEAVES,
    icon: "NotepadText",
    isOther: false,
  },
  {
    id: "holidays",
    label: "Holidays",
    path: ROUTES.HOLIDAYS,
    icon: "ClipboardList",
    isOther: false,
  },
  {
    id: "support",
    label: "Support",
    path: ROUTES.SUPPORT,
    icon: "Headset",
    isOther: true,
  },
  {
    id: "settings",
    label: "Settings",
    path: ROUTES.SETTINGS,
    icon: "Settings",
    isOther: true,
  },
] as const;

export const EMPLOYEE_STATUS = {
  ON_TIME: "On-Time",
  SICK_LEAVE: "Sick Leave",
  LATE: "Late",
  ABSENT: "Absent",
  VACATION: "Vacation",
  REMOTE: "Remote",
} as const;

export const CHART_COLORS = {
  PRIMARY: "#f97316",
  SECONDARY: "#3b82f6",
  SUCCESS: "#22c55e",
  WARNING: "#eab308",
  DANGER: "#ef4444",
  INFO: "#06b6d4",
  PURPLE: "#a855f7",
  PINK: "#ec4899",
  INDIGO: "#6366f1",
  GRAY: "#6b7280",
  DONUT: ["#3b82f6", "#22c55e"],
  BARS: [
    "#22c55e", // direct - green
    "#3b82f6", // wework - blue
    "#1f2937", // linkedIn - dark gray
    "#f97316", // hired - orange
    "#6366f1", // internal - indigo
    "#22c55e", // referral - green
    "#6b7280", // others - gray
  ],
} as const;

// status
export const STATUS_COLORS = {
  [EMPLOYEE_STATUS.ON_TIME]: "bg-green-100 text-green-800 border-green-200",
  [EMPLOYEE_STATUS.SICK_LEAVE]:
    "bg-yellow-100 text-yellow-800 border-yellow-200",
  [EMPLOYEE_STATUS.LATE]: "bg-purple-100 text-purple-800 border-purple-200",
  [EMPLOYEE_STATUS.ABSENT]: "bg-red-100 text-red-800 border-red-200",
  [EMPLOYEE_STATUS.VACATION]: "bg-blue-100 text-blue-800 border-blue-200",
  [EMPLOYEE_STATUS.REMOTE]: "bg-gray-100 text-gray-800 border-gray-200",
} as const;
