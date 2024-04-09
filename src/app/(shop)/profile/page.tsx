import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  return <div>ProfilePage</div>;
};

export default ProfilePage;
