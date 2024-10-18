"use client";
import { useCoinIncrement } from "@/hooks/gameHook";

import Image from "next/image";
interface TabButtonProps {
  button: string;
}

export default function TabButton({ button }: TabButtonProps) {
  const { incrementCoins } = useCoinIncrement();
  const handleClick = () => {
    incrementCoins();
  };

  return (
    <button onClick={handleClick} className="pt-8">
      <Image
        src={button}
        alt="image of button"
        width={335}
        height={335}
      ></Image>
    </button>
  );
}
