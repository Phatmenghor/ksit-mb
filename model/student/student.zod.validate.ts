import { z } from "zod";

export const generateMultipleStudentSchema = z.object({
  classId: z.object({
    id: z.number(),
    code: z.string(),
  }),
  quantity: z
    .string()
    .regex(/^\d+$/, { message: "Quantity must be a positive number" })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: "Quantity must be at least 1",
    }),
  status: z.string().min(1, "Status is required"),
});

export type GenerateMultipleStudentSchema = z.infer<
  typeof generateMultipleStudentSchema
>;
