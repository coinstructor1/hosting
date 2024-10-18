"use client";
import EarnSection from "@/app/components/earn/EarnSection";
import LevelTicker from "@/app/components/main/LevelTicker";
import UserTicker from "@/app/components/main/UserTicker";
import { EarnItems } from "@/app/models/EarnItems";
import { IUser } from "@/app/models/User";
import { useUser } from "@/hooks/userHook";
import Image from "next/image";
export default function Earn() {
  const user: IUser = useUser();
  return (
    <main>
      <div className="flex flex-col items-center">
        <UserTicker user={user}></UserTicker>
        <LevelTicker user={user}></LevelTicker>
        <Image src="/icons/coin_big.png" alt="coin" width={100} height={100} />
        <h1 className="text-2xl font-bold">Earn more coins</h1>
        <EarnSection earnItems={EarnItems}></EarnSection>
      </div>
    </main>
  );
}
