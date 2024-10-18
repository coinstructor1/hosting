import { BadRequestError, NotFoundError } from "@/app/lib/errors/apiErrors";
import { withErrorHandling } from "@/app/lib/errors/withErrorHandling";
import dbConnect from "@/app/lib/mongodb";
import User, { IMongoUser } from "@/app/models/User";
import { checkCombosForUser } from "@/app/services/comboService";
import { checkMiningForUser } from "@/app/services/miningService";

import { NextRequest, NextResponse } from "next/server";

interface RequestData {
  telegramId: string;
  miningItemId: string;
}

const handler = withErrorHandling(async (req: NextRequest) => {
  const data = (await req.json()) as RequestData;
  const { telegramId, miningItemId } = data;

  if (!telegramId || typeof telegramId !== "string") {
    throw new BadRequestError("invalid Telegram-ID");
  }

  await dbConnect();

  let existingUser = await User.findOne<IMongoUser>({ telegramId });

  if (!existingUser) {
    throw new NotFoundError("User Not Found");
  }

  existingUser = checkMiningForUser(existingUser, miningItemId);
  existingUser = checkCombosForUser(existingUser);

  existingUser.save();
  const miningItem = existingUser.miningItems?.find((item) => item.id === miningItemId);
  return NextResponse.json(
    {
      user: existingUser,
      success: true,
      message: `mining item ${miningItemId} activated at level ${miningItem?.level}.`,
    },
    { status: 200 }
  );
});

export { handler as POST };
