"use client";
import GameHeader from "@/app/components/GameHeader";
import { useUser } from "@/hooks/userHook";
import ProgressBar from "../ProgressBar";
import BoostBar from "./BoostBar";
import TabButton from "./TabButton";

import { images, maxBoostScore, maxLevel } from "@/app/constants";
import { calcPercentageProgress } from "@/utilities/utils";


function MainScreen() {
  const user = useUser();
  const progress = calcPercentageProgress(user.totalCoins, user.coinsToLevelUp);
  return (
    <div className="main-screen">
      <GameHeader user={user} coinIconString={images.coinIconstring} />
      <ProgressBar
        level={user.level}
        progress={progress}
        maxLevel={maxLevel}
      ></ProgressBar>
      <div className="flex justify-center items-center my-4">
        <TabButton button={images.tabButton} />
      </div>
      <BoostBar
        imagePath={images.flash}
        boostScore={user.boostScore}
        maxBoostScore={maxBoostScore}
      ></BoostBar>
    </div>
  );
}

export default MainScreen;
