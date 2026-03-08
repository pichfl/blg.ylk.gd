import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const post = defineCollection({
  loader: glob({ base: "./posts", pattern: "**/message.md" }),

  schema: ({}) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      assets: z
        .array(
          z.object({
            filename: z.string(),
            width: z.number(),
            height: z.number(),
            orientation: z.enum(["portrait", "landscape", "square"]),
          }),
        )
        .optional(),
    }),
});

export const collections = { post };
