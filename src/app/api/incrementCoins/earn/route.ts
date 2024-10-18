import { NotFoundError } from "@/app/lib/errors/apiErrors";
import { withErrorHandling } from "@/app/lib/errors/withErrorHandling";
import dbConnect from "@/app/lib/mongodb";
import { EarnItems } from "@/app/models/EarnItems";
import User, { IMongoUser } from "@/app/models/User";

import { NextRequest, NextResponse } from "next/server";

interface RequestData {
  telegramId: string;
  earnItemId: string;
}
const handler = withErrorHandling(async (req: NextRequest) => {
  const { telegramId, earnItemId } = (await req.json()) as RequestData;

  // find earn item by id
  const earnItem = EarnItems.find((item) => item.id === earnItemId);

  // find user by telegramId if earnItem exists
  if (earnItem) {
    await dbConnect();
    const user = await User.findOne<IMongoUser>({ telegramId });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // check if user already has the earn item
    if (user.earnItems.includes(earnItemId)) {
      return NextResponse.json(
        {
          success: false,
          message: "User already has claimed this earn item: " + earnItem.name,
          totalCoins: user.totalCoins,
        },
        { status: 200 }
      );
    }

    user.earnItems.push(earnItemId);
    user.totalCoins += earnItem.value;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "thankyou for claiming the earn item: " +
          earnItem.name +
          " you earned " +
          earnItem.value +
          " coins",
        totalCoins: user.totalCoins,
      },
      { status: 200 }
    );
  }
  throw new NotFoundError("Earn item not found");
});

export { handler as POST };
