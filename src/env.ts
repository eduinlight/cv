import { z } from "zod";

const envSchema = z.object({
  CV_OUTPUT_PATH: z.string(),
});

export const env = envSchema.parse(process.env);
