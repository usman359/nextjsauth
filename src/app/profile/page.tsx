"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout success", response.data);
      toast.success("Logout success");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        console.log("Unexpected error", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h1>
      <hr />
      <p>Profile</p>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}
