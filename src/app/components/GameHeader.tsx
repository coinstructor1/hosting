"use client";
import LevelTicker from "./main/LevelTicker";
import TotalCoinsDisplay from "./main/TotalCoinsDisplay";
import UserTicker from "./main/UserTicker";

import { IUser } from "../models/User";

interface GameHeaderProps {
  user: IUser;
  coinIconString: string;
}

export default function GameHeader({ user, coinIconString }: GameHeaderProps) {
  return (
    <div>
      <UserTicker user={user}></UserTicker>
      <LevelTicker user={user}></LevelTicker>
      <TotalCoinsDisplay
        user={user}
        coinIcon={coinIconString}
      ></TotalCoinsDisplay>
    </div>
  );
}
