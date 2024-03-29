import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="flex w-full justify-center text-xs mb-10">
      <Link href={"/"}>
        <span className={`${titleFont.className} antialiased font-bold`}>
          Amigurus{" "}
        </span>
        <span>| Shop </span>
        <span>&copy; {new Date().getFullYear()}</span>
      </Link>
      <Link href={"/"} className="mx-3">
        Privacy & Legacy
      </Link>
      <Link href={"/"} className="mx-3">
        Locations
      </Link>
    </footer>
  );
};
