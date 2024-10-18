"use client";

import Image from "next/image";
import Link from "next/link";
interface BoostBarProps {
  imagePath: string;
  boostScore: number;
  maxBoostScore: number;
}

export default function BoostBar({
  imagePath,
  boostScore,
  maxBoostScore,
}: BoostBarProps) {
 
  return (
    <div className="w-full px-4 pt-4">
      <div className="pt-12 flex justify-between">
        <div className="flex flex-row">
          <Image
            src={imagePath}
            alt="image of flash"
            width={20}
            height={30}
          ></Image>
          <span className="pl-1">
            {boostScore} / {maxBoostScore}
          </span>
        </div>
        <Link href={"/boost"}>Boost</Link>
      </div>
    </div>
  );
}
