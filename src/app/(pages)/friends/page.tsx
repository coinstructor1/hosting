'use client';
import GameHeader from "@/app/components/GameHeader";
import { images } from "@/app/constants";
import { useUser } from "@/hooks/userHook";
export default function Earn() {
  const user = useUser();
  return (
    <main>
      <GameHeader user={user} coinIconString={images.coinIconstring} />
    </main>
  );
}
