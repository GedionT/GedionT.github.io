// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content', // v2.5.0+ feature, use 'content' for MD/MDX
    schema: z.object({
        title: z.string(),
        date: z.string(),
        readingTime: z.string(),
        excerpt: z.string(),
        tags: z.array(z.string()),
    }),
});

export const collections = { blog };