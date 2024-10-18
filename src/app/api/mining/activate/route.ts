import { miningDistributionInterval } from "@/app/constants";
import { BadRequestError } from "@/app/lib/errors/apiErrors";
import dbConnect from "@/app/lib/mongodb";
import User, { IUser } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const { telegramId } = await req.json();
  if (!telegramId || typeof telegramId !== "string") {
    throw new BadRequestError("invalid Telegram-ID");
  }
  await dbConnect();
  const user = await User.findOneAndUpdate<IUser>(
    { telegramId },
    { isMining: true, lastMiningTime: new Date() },
    { new: true }
  );
  if (!user) {
    throw new BadRequestError("User Not Found");
  }
  return NextResponse.json({
    success: true,
    message: "mining activated",
    user: user,
  });
};
export { handler as POST };
