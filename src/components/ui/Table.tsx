/* eslint-disable @next/next/no-img-element */
import { STATUS_COLORS } from "@/utils/constants";
import { EllipsisVertical } from "lucide-react";
import React from "react";

interface Employee {
  id: string;
  name: string;
  avatar: string;
  employeeId: string;
  role: string;
  email: string;
  phone: string;
  reimbursement: number;
  status: string;
}
interface TableProps {
  paginatedData: Employee[];
}
const Table: React.FC<TableProps> = ({ paginatedData }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              <input type="checkbox" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Employee ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Reimbursement
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Attendence
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                No employees found
              </td>
            </tr>
          ) : (
            paginatedData.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <input type="checkbox" />
                  </th>
                </td>
                <td>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <div className="text-sm text-gray-500">
                      {employee.employeeId}
                    </div>
                  </th>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={employee.avatar}
                        alt={employee.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            employee.name
                          )}&size=32&background=f3f4f6&color=374151`;
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <div className="text-sm text-gray-500">
                      {employee.email}
                    </div>
                  </th>
                </td>
                <td>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <div className="text-sm text-gray-500">
                      {employee.phone}
                    </div>
                  </th>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.role}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${employee.reimbursement.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-md border ${
                      STATUS_COLORS[
                        employee.status as keyof typeof STATUS_COLORS
                      ] || "bg-gray-100 text-gray-800 border-gray-200"
                    }`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EllipsisVertical />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
