'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const navItems = [
    { text: "Tap2Earn", link: "/", icon: "/icons/binanceLogo.png" },
    { text: "Mission", link: "/mission", icon: "/icons/mission.png" },
    { text: "Friends", link: "/friends", icon: "/icons/friends.png" },
    { text: "Earn", link: "/earn", icon: "/icons/earn.png" },
    { text: "Wallet", link: "/wallet", icon: "/icons/wallet.png" },
  ];
  const [activeLink, setActiveLink] = useState("/");
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black p-0 rounded-t-xl flex justify-around items-end">
      {navItems.map((item) => (
        <Link
          href={item.link}
          key={item.link}
          onClick={() => setActiveLink(item.link)}
          className={`flex flex-col items-center ${activeLink === item.link ? "bg-orange-700 rounded" : ""}`}
        >
          <Image
            src={item.icon}
            width={25}
            height={25}
            alt="icon"
            className="rounded"
          />
          <p className="text-white text-center">{item.text}</p>
        </Link>
      ))}
    </nav>
  );
}
