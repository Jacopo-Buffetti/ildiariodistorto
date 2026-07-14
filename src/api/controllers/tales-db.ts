import mongoose from "mongoose";

import connectDB from "@/api/lib/connect-db";
import {ReorderItem, Tale, TaleDocument} from "@/api/Models/Tales";
import { stringToObjectId } from "@/utils/server-utils";

interface Filter {
  page?: number;
  limit?: number;
  sort?: string;
  sortBy?: string;
}

export async function getTales(filter: Filter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 50;
    const skip = (page - 1) * limit;
    const sortOrder = filter.sort === "desc" ? -1 : 1;
    const sortBy = filter.sortBy ?? "order";
    const tales = await Tale.find()
        .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean({ virtuals: true })
      .exec();

    const results = tales.length;

    return {
      data: tales,
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
      return { error: "Tale not found" };
    }
    const tale = await Tale.findById(parsedId, { password: 0 })
      .lean({ virtuals: true })
      .exec();
    if (tale?.title) {
      return { ...tale };
    } else {
      return { error: { message: "Tale not found" } };
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
      return { error: { message: "Tale not found" } };
    }

    const tale = await Tale.findByIdAndUpdate(parsedId, updateData, {
      returnDocument: "after",
    })
      .lean({ virtuals: true })
      .exec();

    if (tale) {
      return tale;
    } else {
      return { error: { message: "Tale not found" } };
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
      return { error: { message: "Tale not found" } };
    }

    const tale = await Tale.findByIdAndDelete(parsedId).exec();

    if (tale) {
      return { message: "Tale deleted" };
    } else {
      return { error: { message: "Tale not found" } };
    }
  } catch (error) {
    return { error };
  }
}

export async function reorderTales(updates: ReorderItem[]) {
  if (!updates.length) return;
  try {
    await connectDB();

    const hasInvalidIds = updates.some(
      ({ id }) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (hasInvalidIds) {
      return { error: { message: "One or more tale IDs are invalid" } };
    }

    const tale = await Tale.bulkWrite(
      updates.map(({ id, order }) => ({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(id) },
          update: { $set: { order } },
        },
      }))
    );
    if (tale) {
      return { message: "Tale order updated" };
    } else {
      return { error: { message: "Tale order not updated found" } };
    }
  } catch (error) {
    return {
      error:
        error instanceof Error ? { message: error.message, name: error.name } : error,
    };
  }
}
