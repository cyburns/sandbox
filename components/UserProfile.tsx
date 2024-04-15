import Image from "next/image";
import React from "react";

const UserProfile = ({ user }: any) => {
  return (
    <div className="flex justify-center items-center bg-gray-700 rounded-lg m-10 p-10">
      <p className="text-white text-3xl mr-10">
        {user.name.first} {user.name.last}
      </p>
      <img
        className="rounded-full"
        src={user.picture.large}
        width={200}
        height={200}
        alt="Picture of the author"
      />
    </div>
  );
};

export default UserProfile;
