import { newUserEnviroment } from "@/app/constants";
import dbConnect from "@/app/lib/mongodb";
import User, { IMongoUser } from "@/app/models/User";
import UserModel from "@/app/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { telegramId } = await req.json();

  try {
    await dbConnect();

    const existingUser = await User.findOne({ telegramId });

    if (existingUser) {
      return NextResponse.json(existingUser, { status: 200 });
    } else {
      newUserEnviroment.telegramId = telegramId;
      const newUser: IMongoUser = new User(newUserEnviroment);

      await newUser.save();
      return NextResponse.json(newUser, { status: 200 });
    }
  } catch (e) {
    console.error(
      "Something went wrong by saving user at endpoint /api/user: " + e
    );
    return NextResponse.json({ message: "Error saving user" }, { status: 500 });
  }
}
