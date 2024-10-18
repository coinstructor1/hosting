"use client";
import Image from "next/image";
import React from "react";
import { IUser } from "../../models/User";
import "./LevelTicker.css";
interface LevelTickerProps {
  user: IUser;
}

const LevelTicker: React.FC<LevelTickerProps> = ({ user }) => {
  return (
    <div className="level-ticker">
      <LevelTickerItem
        label="Earn Per Tap"
        value={user.earnPerTap}
        className="tap-to-earn"
      />
      <LevelTickerItem
        label="Coins To Level Up"
        value={user.coinsToLevelUp}
        className="coins-to-level-up"
      />
      <LevelTickerItem
        label="Profit Per Hour"
        value={user.profitPerHour}
        className="profit-per-hour"
      />
    </div>
  );
};

const LevelTickerItem: React.FC<{
  label: string;
  value: number;
  className: string;
}> = ({ label, value, className }) => {
  return (
    <div className={`level-ticker-item ${className}`}>
      <p className="level-ticker-label">{label}</p>
      <div className="level-ticker-separator">
        <Image
          src="/coin.svg"
          alt="Coin"
          width={25}
          height={25}
          className="level-ticker-image "
        />
        <p className="level-ticker-value">{value}</p>
      </div>
    </div>
  );
};

export default LevelTicker;
