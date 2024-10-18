import dbConnect from "@/app/lib/mongodb";
import User, { IMongoUser } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
// To handle a GET request to /api/
export async function GET() {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api/tab2earn
export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const newUser: IMongoUser = new User(data);

  try {
    await dbConnect();
    await newUser.save();
  } catch (e) {
    console.error(
      "Something went wrong by saving user at endpoint /api/tab2earn: " + e
    );
    return NextResponse.json({ message: "Error saving user" }, { status: 500 });
  }

  return NextResponse.json(
    { message: `user ${newUser.telegramId} saved` },
    { status: 200 }
  );
}
