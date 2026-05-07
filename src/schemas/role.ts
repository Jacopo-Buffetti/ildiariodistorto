import { z } from "zod";

export const RoleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

export type Role = z.infer<typeof RoleSchema>;
