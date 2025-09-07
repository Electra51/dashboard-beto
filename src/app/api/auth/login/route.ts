import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    const mockUser = {
      id: "1",
      name: "Robert Allen",
      role: "HR Manager",
      email: email,
      avatar: "/avatars/robert.jpg",
    };

    const mockToken = "mock-jwt-token-" + Date.now();

    return NextResponse.json({
      token: mockToken,
      user: mockUser,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
