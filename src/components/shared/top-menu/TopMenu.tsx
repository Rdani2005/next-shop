import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const TopMenu = () => {
    return (
        <nav className="flex px-5 justify-between items-center w-full">
            <div className="">
                <Link href={"/"}>
                    <span
                        className={`${titleFont.className} antialiased font-bold`}
                    >
                        Amigurus
                    </span>
                    <span> | Store</span>
                </Link>
            </div>
            <div className="">
                <Link
                    href={"/category/men"}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Men
                </Link>
                <Link
                    href={"/category/men"}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Women
                </Link>
                <Link
                    href={"/category/men"}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Kids
                </Link>
            </div>
        </nav>
    );
};
