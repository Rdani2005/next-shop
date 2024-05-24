"use client";

import { User } from "@/interfaces";

interface Props {
  user: User[];
}

export const UsersTable = ({ user }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            #
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Full Name
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            role
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Options
          </th>
        </tr>
      </thead>
      <tbody>
        {user.map((user, index) => (
          <tr
            key={user.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {index + 1}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.email}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 ">
              {user.role}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
