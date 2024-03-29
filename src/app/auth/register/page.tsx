import Link from "next/link";
import { titleFont } from "@/config/fonts";

const Page = () => {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Register</h1>

      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text"
        />
        <label htmlFor="email">Email Address</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
        />

        <button className="btn-primary">Log In</button>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">Or</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Log In
        </Link>
      </div>
    </main>
  );
};

export default Page;
