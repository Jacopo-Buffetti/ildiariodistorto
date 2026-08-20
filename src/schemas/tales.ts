import { z } from "zod";

export const TaleImageSchema = z.object({
    url: z.string(),
    path: z.string(),
    relativePath: z.string(),
    name: z.string(),
    _id: z.string().optional(),
});

export type TaleImage = z.infer<typeof TaleImageSchema>;

/** DB / internal schema (field names as stored in MongoDB) */
export const TalesSchema = z.object({
    id: z.string().optional(),
    title: z.string().nullable().optional(),
    type: z.string().nullable().optional(),
    description: z.string(),
    CoverImage: TaleImageSchema.optional(),
    published: z.boolean().default(true),
});

export const CreateTaleSchema = TalesSchema.omit({ id: true });

export type Tales = z.infer<typeof TalesSchema>;
export type CreateTale = z.infer<typeof CreateTaleSchema>;

/** Client-safe type used by components (no password, mirrors the old UserClass from Models) */
export type TalesClass = Tales & { _id?: string };

// ---------------------------------------------------------------------------
// API request schema (what the form sends → server)
// Uses Italian field names and transforms them to the DB shape.
// ---------------------------------------------------------------------------

/** Raw input shape sent by the form */
export const CreateTaleRequestSchema = z
    .object({
        title: z.string().nullable().optional(),
        tipo: z.string().nullable().optional(),
        description: z.string(),
        CoverImage: TaleImageSchema.optional(),
        published: z.preprocess(
            (val) => {
                if (typeof val === "boolean") return val;
                if (val === "true") return true;
                if (val === "false") return false;
                return val;
            },
            z.boolean().default(true))
    })
    .transform(({ tipo, ...rest }) => ({ ...rest, type: tipo }));

export type CreateTaleRequest = z.input<typeof CreateTaleRequestSchema>;

/**
 * Field names the form must use when building FormData.
 * `satisfies Record<keyof CreateTaleRequest, string>` ensures that any rename
 * or addition in the request schema causes a compile-time error here and in
 * every consumer.
 */
export const TALE_FORM_KEYS = {
    title: "title",
    tipo: "tipo",
    description: "description",
    CoverImage: "CoverImage",
    published: "published",
} as const satisfies Record<keyof CreateTaleRequest, string>;
