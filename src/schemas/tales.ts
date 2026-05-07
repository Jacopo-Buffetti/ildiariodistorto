import { z } from "zod";

export const TaleImageSchema = z.object({
  url: z.string(),
  path: z.string(),
  relativePath: z.string(),
  name: z.string(),
  _id: z.string().optional(),
});

export const TalesSchema = z.object({
  id: z.string().optional(),
  title: z.string().nullable().optional(),
  description: z.string(),
  CoverImage: TaleImageSchema.optional(),
});

export const CreateTaleSchema = TalesSchema.omit({ id: true });

export type Tales = z.infer<typeof TalesSchema>;
export type CreateTale = z.infer<typeof CreateTaleSchema>;

/** Client-safe type used by components (no password, mirrors the old UserClass from Models) */
export type TalesClass = Tales & { _id?: string };
