import connect from "../../../../config/dbconfig";
import User from "../../../../model/userModel";
import argon2 from "argon2";
import { generateToken } from "../../../../config/generateToken";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connect();
  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email });
    console.log(user);
    const valid = await argon2.verify(user.password, password);
    console.log(valid);
    if (!valid) {
      console.log("error in password");
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    if (user) {
      return NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        picture: user.picture,
        createdAt: user.createdAt,
        token: generateToken(user._id),
      });
    } else {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
