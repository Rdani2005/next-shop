"use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm: FC = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email Address</label>
      <input
        name="email"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
      />

      <label htmlFor="password">Password</label>
      <input
        name="password"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="flex mb-2 ">
            <IoInformationOutline className="h-5 text-red-500" />
            <p className="text-sm text-red-500">Invalid Credentials</p>
          </div>
        )}
      </div>

      <LoginButton />
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/register" className="btn-secondary text-center">
        Create New Account
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disable": pending,
      })}
      disabled={pending}
    >
      Log In
    </button>
  );
}
