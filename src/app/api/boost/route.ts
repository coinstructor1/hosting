import { NotFoundError } from "@/app/lib/errors/apiErrors";
import { withErrorHandling } from "@/app/lib/errors/withErrorHandling";
import dbConnect from "@/app/lib/mongodb";
import { BoostItems } from "@/app/models/BoostItems";
import User, { IMongoUser } from "@/app/models/User";


import { NextRequest, NextResponse } from "next/server";


interface RequestData {
  telegramId: string;
  boostItemId: string;
}

const handler = withErrorHandling(async (req: NextRequest) => {
  // get telegram id and boost item id from request body
  const { telegramId, boostItemId } = (await req.json()) as RequestData;
  // find boost item by id
  const boostItem = BoostItems.find((item) => item.id === boostItemId);
  // find user by telegramId if boostItem exists
  if (!boostItem) {
    throw new NotFoundError("Boost item not found");
  }
  await dbConnect();
  const user = await User.findOne<IMongoUser>({ telegramId });

  if (!user) {
    throw new NotFoundError("User not found");
  }
  // check if user already has the boost item
  const usersBoostItem = user.boostItems?.find(
    (item) => item.id === boostItemId
  );
  if (usersBoostItem) {
    return NextResponse.json(
      {
        success: false,
        message: "User already has claimed boost item: " + boostItem.id,
        expires: usersBoostItem.expires,
      },
      { status: 200 }
    );
  }
  // check if user has enough coins to buy the boost item
  if (user.totalCoins < boostItem.cost) {
    return NextResponse.json(
      { success: false, message: "Not enough coins" },
      { status: 200 }
    );
  }
  // deduct coins from user's total coins
  user.totalCoins -= boostItem.cost;
  // set expiry date for boost item
  const now = new Date();
  boostItem.expires = new Date(
    now.setSeconds(now.getSeconds() + boostItem.duration)
  );
  // add boost item to user's boost items
  user.boostItems?.push(boostItem);
  user.save();

  return NextResponse.json({
    success: true,
    message: `Boostitem ${boostItemId} activated. expires: ${boostItem.expires}`,
    boostItems: user.boostItems,
  });
});

export { handler as POST };
