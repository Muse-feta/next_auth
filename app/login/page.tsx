"use client";

import React, { useEffect, useState } from "react";
import axios  from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [user, setUser] = useState({
 
    email: "",
    password: "",
  
  });

  useEffect(() => {
    if(user.email && user.password) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  },[user])

  const [disabledButton, setDisabledButton] = useState<boolean>(false)
  const router = useRouter();

  const onLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      console.log(res.data);
      router.push("/profile");
    } catch (error) {
      console.log("error occured", error);
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
         
       
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onLogin}
            >
              {disabledButton ? "Loading..." : "Login"}
            </button>
            <Link
              href="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
