import mongoose from "mongoose";

import connectDB from "@/api/lib/connect-db";
import { Tale, TaleDocument } from "@/api/Models/Tales";
import { stringToObjectId } from "@/utils/server-utils";

interface Filter {
  page?: number;
  limit?: number;
}

export async function getTales(filter: Filter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 50;
    const skip = (page - 1) * limit;

    const users = await Tale.find({}, { password: 0 })
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

export async function createTale(data: TaleDocument) {
  try {
    await connectDB();

    if (data.id) {
      data._id = new mongoose.Types.ObjectId(data.id);
    } else {
      data._id = new mongoose.Types.ObjectId();
    }
    return (
      await Tale.create({
        ...data,
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

export async function getTale(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);
    if (!parsedId) {
      return { error: "User not found" };
    }
    const tale = await Tale.findById(parsedId, { password: 0 })
      .lean({ virtuals: true })
      .exec();
    if (tale?.title) {
      return { ...tale };
    } else {
      return { error: { message: "User not found" } };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateTale(id: string, data: Partial<TaleDocument>) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);
    const updateData = {
      ...data,
    };

    if (!parsedId) {
      return { error: { message: "User not found" } };
    }

    const user = await Tale.findByIdAndUpdate(parsedId, updateData, {
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

export async function deleteTale(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: { message: "User not found" } };
    }

    const user = await Tale.findByIdAndDelete(parsedId).exec();

    if (user) {
      return { message: "User deleted" };
    } else {
      return { error: { message: "User not found" } };
    }
  } catch (error) {
    return { error };
  }
}
