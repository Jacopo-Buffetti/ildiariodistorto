import mongoose, { Model, model, Schema } from "mongoose";

import type { Role } from "@/schemas/role";

interface IRole extends Omit<Role, "id"> {
  _id: mongoose.Types.ObjectId;
}

const RoleMongooseSchema = new Schema<IRole>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "roles",
  }
);

RoleMongooseSchema.virtual("id").get(function (this: IRole) {
  return this._id.toHexString();
});

export type RoleClass = Role & { _id?: mongoose.Types.ObjectId | string };

export const Roles: Model<IRole> =
  (mongoose.models["Role"] as Model<IRole>) ??
  model<IRole>("Role", RoleMongooseSchema);
