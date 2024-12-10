import { NextRequest } from "next/server";
import toast from "react-hot-toast";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as JwtPayload;

    return decodedToken.id;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      toast.error(error.message);
      throw new Error(error.message);
    } else {
      console.log("Unexpected error", error);
      toast.error("An unexpected error occurred");
    }
  }
};
