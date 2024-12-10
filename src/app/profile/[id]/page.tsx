import React from "react";

interface Params {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: Params) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile
        <span className="p-2 rounded bg-orange-500 text-black ml-2">
          {params.id}
        </span>
      </p>
    </div>
  );
}
