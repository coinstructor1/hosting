"use client";
import Image from "next/image";
import { IUser } from "../../models/User";
interface TotalCoinsDisplayProps {
  user: IUser;
  coinIcon: string;
}
const TotalCoinsDisplay: React.FC<TotalCoinsDisplayProps> = ({
  user,
  coinIcon,
}) => {
  return (
    <div className="flex justify-center items-center text-4xl font-bold text-white-400 my-4">
      <Image
        src={coinIcon}
        alt="user"
        width={42}
        height={42}
        className="rounded-full"
      />
      <p>{user.totalCoins}</p>
    </div>
  );
};

export default TotalCoinsDisplay;
