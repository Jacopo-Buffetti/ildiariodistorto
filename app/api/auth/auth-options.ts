import "server-only";

import bcrypt from "bcrypt";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getUser } from "@/api/controllers/user-db";
import connectDB from "@/api/lib/connect-db";
import { User } from "@/api/Models/Users";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        await connectDB();

        const user = await User.findOne({ email })
          .lean({ virtuals: true })
          .exec();

        if (!user) {
          throw new Error("User not found");
        }

        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
          throw new Error("Password is incorrect");
        }
        return {
          id: user._id.toHexString(),
          name: user.name,
          email: user.email,
          image: user.avatar ?? null,
          role:
            typeof user.role === "string"
              ? user.role
              : user.role?.toHexString(),
        };
      },
    }),
  ],
  callbacks: {
    async session(data) {
      if (!data.token.sub) {
        return data.session;
      }

      const users = await getUser(data.token.sub);
      if ("error" in users) {
        return data.session;
      }
      return {
        ...data.session,
        _id: data.token.sub,
        role: users.role,
        avatar: users.avatar,
        name: users.name,
        email: users.email,
      };
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const users = await getUser(token.sub);
      if ("error" in users) {
        return token;
      }
      return { ...token, role: users.role, avatar: users.avatar };
    },
  },
};
