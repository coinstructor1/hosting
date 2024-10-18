import { maxLevel, miningDistributionInterval } from "@/app/constants";
import { BadRequestError } from "@/app/lib/errors/apiErrors";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { checkLevelUp } from "@/utilities/utils";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const { telegramId } = await req.json();
  if (!telegramId || typeof telegramId !== "string") {
    throw new BadRequestError("invalid Telegram-ID");
  }
  await dbConnect();

  let user = await User.findOne({ telegramId });
  if (!user) {
    throw new BadRequestError("User Not Found");
  }

  const currentTime = new Date();

  if (!user.isMining) {
    return NextResponse.json(
      { success: false, message: "you have to acivate mining", user: user },
      { status: 200 }
    );
  }

  const lastMiningTime = user.lastMiningTime || new Date(0);

  const hoursPassed = Math.floor(
    (currentTime.getTime() - lastMiningTime.getTime()) /
      miningDistributionInterval
  );
  if (hoursPassed >= 1) {
    const coinsPerHour = user.profitPerHour;
    const coinsToAdd = hoursPassed * coinsPerHour;

    user.totalCoins += coinsToAdd;
    user.lastMiningTime = currentTime;
    user = checkLevelUp(user, maxLevel);

    await user.save();

    return NextResponse.json({
      success: true,
      message: "mining rewards claimed",
      user: user,
      coinsAdded: coinsToAdd,
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "no coins added, not enough time passed",
      user: user,
    });
  }
};
export { handler as POST };
