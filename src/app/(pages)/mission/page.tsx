"use client";
import GameHeader from "@/app/components/GameHeader";
import MiningItem from "@/app/components/mining/MiningItem";
import { images } from "@/app/constants";
import { MiningItems } from "@/app/models/MiningItems";
import { useUser } from "@/hooks/userHook";
export default function Earn() {
  const user = useUser();
  return (
    <main>
      <GameHeader user={user} coinIconString={images.coinIconstring} />
      <div className="flex flex-wrap justify-center">
        {MiningItems.map((item) => (
          <MiningItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            profitPerHour={item.profitPerHour}
            level={item.level}
            cost={item.cost}
          />
        ))}
      </div>
    </main>
  );
}
