import Image from "next/image";
import React from "react";

const UserProfile = ({ user }: any) => {
  return (
    <div>
      <p className="text-white text-3xl">
        {user.name.first} {user.name.last}
      </p>
      <img
        src={user.picture.large}
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  );
};

export default UserProfile;
