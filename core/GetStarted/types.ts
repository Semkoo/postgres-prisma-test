import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required" }),
  lastName: z.string().min(1, { message: "Lastname is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
});

export type ContactValidationSchema = z.infer<typeof contactFormSchema>;

export const businessFormSchema = z.object({
  businessName: z.string().min(1, { message: "Business name is required" }),
  businessCity: z.string().min(1, { message: "Business city is required" }),
  businessWebsite: z.string(),
  businessEmail: z.string().min(1, { message: "Business email is required" }),
});

export type BusinessValidationSchema = z.infer<typeof businessFormSchema>;

export const financialFormSchema = z.object({
  businessIncomePerMonth: z
    .number()
    .min(0, { message: "Business Income Per Month is required" }),
  businessTaxPercentage: z
    .number()
    .min(0, { message: "Business Tax Percentage is required" }),
});

export type FinancialValidationSchema = z.infer<typeof financialFormSchema>;

export const confirmationFormSchema = z.object({
  ...contactFormSchema.shape,
  ...businessFormSchema.shape,
  ...financialFormSchema.shape,
});

export type ConfirmationValidationSchema = z.infer<
  typeof confirmationFormSchema
>;
