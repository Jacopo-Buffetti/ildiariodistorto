import mongoose, { Model, model, Schema } from "mongoose";

import type { User as UserType } from "@/schemas/user";

// Re-export client-safe type for backward compatibility
export type { UserClass } from "@/schemas/user";

/** Server-side type that allows ObjectId for _id (used in controllers) */
export type UserDocument = UserType & {
  _id?: mongoose.Types.ObjectId | string;
};

/** Internal MongoDB document type */
interface IUser extends Omit<UserType, "id" | "role"> {
  _id: mongoose.Types.ObjectId;
  role?: mongoose.Types.ObjectId | string;
}

const UserMongooseSchema = new Schema<IUser>(
  {
    avatar: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      default: process.env.DEFAULT_ROLE_ID
        ? new mongoose.Types.ObjectId(process.env.DEFAULT_ROLE_ID)
        : undefined,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

/** `id` virtual as hex string — available with lean({ virtuals: true }) */
UserMongooseSchema.virtual("id").get(function (this: IUser) {
  return this._id.toHexString();
});

export const User: Model<IUser> =
  (mongoose.models["User"] as Model<IUser>) ??
  model<IUser>("User", UserMongooseSchema);
