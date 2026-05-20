import mongoose, { Model, model, Schema } from "mongoose";

import type { Tales as TaleType } from "@/schemas/tales";

// Re-export client-safe type for backward compatibility
export type { TalesClass } from "@/schemas/tales";

/** Server-side type that allows ObjectId for _id (used in controllers) */
export type TaleDocument = TaleType & {
    _id?: mongoose.Types.ObjectId | string;
};

/** Internal MongoDB document type */
interface Itale extends Omit<TaleType, "id" | "role"> {
    _id: mongoose.Types.ObjectId;
    role?: mongoose.Types.ObjectId | string;
    order?: number;
}

const TaleMongooseSchema = new Schema<Itale>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        order: { type: Number, default: 0 },
        type: { type: String, required: true },
        CoverImage: {
            url: String,
            path: String,
            relativePath: String,
            name: String,
        }
    },
    {
        timestamps: true,
        collection: "tales",
    }
);

/** `id` virtual as hex string — available with lean({ virtuals: true }) */
TaleMongooseSchema.virtual("id").get(function (this: Itale) {
    return this._id.toHexString();
});

export const Tale: Model<Itale> =
    (mongoose.models["Tales"] as Model<Itale>) ??
    model<Itale>("Tales", TaleMongooseSchema);

export type ReorderItem = { id: string; order: number };