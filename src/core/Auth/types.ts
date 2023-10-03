import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().refine((val) => val.length >= 1, {
    message: "Password is required ",
  }),
});

export type UserAuthValidationSchema = z.infer<typeof userAuthSchema>;

export const userRegisterSchema = z
  .object({
    ...userAuthSchema.shape,
    name: z.string().min(1),
    verifyPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords don't match",
    path: ["verifyPassword"], // path of error
  });

export type UserRegisterValidationSchema = z.infer<typeof userRegisterSchema>;
