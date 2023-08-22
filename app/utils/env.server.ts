import { z } from "zod";

let envSchema = z.object({
  GA_TRACKING_ID: z.string().min(1),
});

export const env = envSchema.parse(process.env);
