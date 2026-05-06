import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  avatar: z.string().nullable().optional(),
  email: z.email(),
  name: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

/** Schema for create payload (without id) */
export const CreateUserSchema = UserSchema.omit({ id: true });

/** Schema for partial update payload (without id and password) */
export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  password: true,
});

/** Schema for response payloads (without password) */
export const UserResponseSchema = UserSchema.omit({ password: true });

export const UserLoginSchema = UserSchema.omit({
  avatar: true,
  name: true,
  role: true,
  id: true,
});

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type Login = z.infer<typeof UserLoginSchema>;

/** Client-safe type used by components (no password, mirrors the old UserClass from Models) */
export type UserClass = Omit<User, "password"> & { _id?: string };
