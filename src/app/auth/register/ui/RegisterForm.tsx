"use client";
import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data;
    const response = await registerUser(name, email, password);
    if (!response.ok) {
      setErrorMessage(response.message!);
      return;
    }

    await login(email, password);
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <span className="text-red-500">{errorMessage}</span>
      <label htmlFor="name">Name</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.name,
        })}
        type="text"
        {...register("name", { required: true })}
      />
      <label htmlFor="email">Email Address</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        type="email"
        {...register("email", { required: true })}
      />

      <label htmlFor="password">Password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 8 })}
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
    </form>
  );
};
