import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const authByLevel = async (req: NextRequest, role: "admin" | "user") => {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!token) {
      console.error("Token non trovato o non valido");
      return false;
    }

    if (role === "admin") {
      return token.role === "admin";
    }

    if (role === "user") {
      return !!token.role;
    }

    return false;
  } catch (err) {
    console.error("Errore nella decodifica del token:", err);
    return false;
  }
};

export default authByLevel;
