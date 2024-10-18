import { maxLevel, stepToNextLevel } from "@/app/constants";
import { BadRequestError, NotFoundError } from "@/app/lib/errors/apiErrors";
import { withErrorHandling } from "@/app/lib/errors/withErrorHandling";
import dbConnect from "@/app/lib/mongodb";
import { IBoostItem } from "@/app/models/BoostItems";
import User, { IMongoUser, IUser } from "@/app/models/User";
import { calculateCoins, checkBoostItems } from "@/app/services/boostService";
import { checkCombosForUser } from "@/app/services/comboService";
import { checkLevelUp } from "@/utilities/utils";
import { NextRequest, NextResponse } from "next/server";

interface RequestData {
  clicks: number;
  telegramId: string;
}

const handler = withErrorHandling(async (req: NextRequest) => {
  const data = (await req.json()) as RequestData;
  const { clicks, telegramId } = data;

  if (typeof clicks !== "number" || clicks <= 0) {
    throw new BadRequestError("invalid clicks");
  }

  if (!telegramId || typeof telegramId !== "string") {
    throw new BadRequestError("invalid Telegram-ID");
  }

  await dbConnect();

  let existingUser = await User.findOne<IMongoUser>({ telegramId });

  if (!existingUser) {
    throw new NotFoundError("User Not Found");
  }
  console.log(existingUser.boostItems);
  existingUser.boostItems = checkBoostItems(existingUser.boostItems);
  console.log(existingUser.boostItems);
  existingUser.totalCoins += calculateCoins(
    existingUser.earnPerTap,
    existingUser.boostItems,
    clicks
  );

  existingUser = checkLevelUp(existingUser, maxLevel);

  existingUser = checkCombosForUser(existingUser, clicks);

  existingUser.save();
  return NextResponse.json(
    {
      success: true,
      message: "Coins incremente",
      user: existingUser,
    },
    { status: 200 }
  );
});

export { handler as PUT };
