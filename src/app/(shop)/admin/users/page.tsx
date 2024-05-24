import { getPaginatedOrders } from "@/actions";
import { auth } from "@/auth.config";
import { Pagination, Title } from "@/components";
import clsx from "clsx";

import Link from "next/link";
import { notFound } from "next/navigation";
import { IoCardOutline, IoCartOutline } from "react-icons/io5";
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function UsersPage({ searchParams }: Props) {
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
      <Title title="Admin Users" />
      <div className="mb-10">
        <UsersTable />
      </div>

      <Pagination totalPages={totalPages}></Pagination>
    </>
  );
}
