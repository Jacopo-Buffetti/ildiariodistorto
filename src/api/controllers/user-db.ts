import bcrypt from "bcrypt";
import mongoose from "mongoose";

import connectDB from "@/api/lib/connect-db";
import { Roles } from "@/api/Models/Roles";
import { User, UserDocument } from "@/api/Models/Users";
import { stringToObjectId } from "@/utils/server-utils";
import { validateEmail } from "@/utils/utils";

interface UserFilter {
  page?: number;
  limit?: number;
}

export async function getUsers(filter: UserFilter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 50;
    const skip = (page - 1) * limit;

    const users = await User.find({}, { password: 0 })
      .skip(skip)
      .limit(limit)
      .lean({ virtuals: true })
      .exec();

    const results = users.length;

    return {
      data: users,
      page,
      limit,
      results,
    };
  } catch (error) {
    return { error };
  }
}

export async function createUser(data: UserDocument) {
  try {
    await connectDB();

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data.password, salt);
    const userRole = data.role
      ? new mongoose.Types.ObjectId(data.role)
      : undefined;

    if (!validateEmail(data.email)) {
      return { error: { message: "Email not valid" } };
    }
    if (data.id) {
      data._id = new mongoose.Types.ObjectId(data.id);
    } else {
      data._id = new mongoose.Types.ObjectId();
    }
    return (
      await User.create({
        ...data,
        ...(userRole ? { role: userRole } : {}),
        password: hash,
      })
    ).toObject({ virtuals: true });
  } catch (error: unknown) {
    const mongoError = error as {
      code?: number;
      message?: string;
      keyValue?: Record<string, unknown>;
    };
    if (mongoError?.code) {
      return {
        error: {
          code: mongoError.code,
          message: mongoError.message,
          keyValue: mongoError.keyValue,
        },
      };
    }
    return { error };
  }
}

export async function getUser(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);
    if (!parsedId) {
      return { error: "User not found" };
    }
    const user = await User.findById(parsedId, { password: 0 })
      .lean({ virtuals: true })
      .exec();
    if (user?.role) {
      const userRole = await Roles.findById(
        stringToObjectId((user.role as mongoose.Types.ObjectId).toHexString())
      )
        .lean({ virtuals: true })
        .exec();
      return { ...user, role: userRole?.name };
    } else {
      return { error: { message: "User not found" } };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateUser(id: string, data: Partial<UserDocument>) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);
    const updateData = {
      ...data,
      ...(data.role ? { role: new mongoose.Types.ObjectId(data.role) } : {}),
    };

    if (!parsedId) {
      return { error: { message: "User not found" } };
    }

    const user = await User.findByIdAndUpdate(parsedId, updateData, {
      returnDocument: "after",
    })
      .lean({ virtuals: true })
      .exec();

    if (user) {
      return user;
    } else {
      return { error: { message: "User not found" } };
    }
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: { message: "User not found" } };
    }

    const user = await User.findByIdAndDelete(parsedId).exec();

    if (user) {
      return { message: "User deleted" };
    } else {
      return { error: { message: "User not found" } };
    }
  } catch (error) {
    return { error };
  }
}
