import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import React from "react";

const CheckLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }
  return <>{children}</>;
};

export default CheckLayout;
