import { getPaginatedOrders } from "@/actions";
import { auth } from "@/auth.config";
import { Pagination, Title } from "@/components";
import clsx from "clsx";

import Link from "next/link";
import { notFound } from "next/navigation";
import { IoCardOutline, IoCartOutline } from "react-icons/io5";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user.id || session.user.role !== "admin") {
    notFound();
  }
  const { orders, totalPages } = await getPaginatedOrders({
    page: parseInt(searchParams.page || "0"),
  });

  if (!orders || orders?.length === 0)
    return (
      <div className="flex justify-center items-center h-[800px]">
        <IoCartOutline size={80} className="mx-5" />
        <div className="flex flex-col items-center text-left">
          <h1 className="text-xl font-semibold text-left">
            There is not any order.
          </h1>
          <Link href={"/"} className="text-blue-500 mt-2 text-4xl text-left">
            Go Home
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <Title title="Admin Orders" />
      <div className="mb-10">
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
                Status
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
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.orderAddress?.firstName} {order.orderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <span
                    className={clsx("mx-2 flex items-center", {
                      "text-red-800": !order.isPaid,
                      "text-green-800": order.isPaid,
                    })}
                  >
                    <IoCardOutline className="text-red-800" />
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Review Order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages}></Pagination>
    </>
  );
}
