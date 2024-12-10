import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout success",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      toast.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      console.log("Unexpected error", error);
      toast.error("An unexpected error occurred");
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
