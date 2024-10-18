"use client";
import { IUser } from "@/app/models/User";
import "./UserTicker.css";

import { useUserUpdate } from "@/hooks/userHook";
import Image from "next/image";
import React from "react";

interface UserTickerProps {
  user: IUser;
}

const UserTicker: React.FC<UserTickerProps> = ({ user }) => {
  const { loading } = useUserUpdate();
  return (
    <div className="user-ticker">
      <Image
        className="user-image"
        src={user.image}
        alt="User Image"
        width={19}
        height={19}
      />
      {(!loading && <h3 className="user-name">{user.name}</h3>) || (
        <h3 className="user-name">Loading...</h3>
      )}
    </div>
  );
};

export default UserTicker;
