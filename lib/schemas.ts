import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Naam moet minstens 2 karakters zijn"),
  email: z.string().email("Geldig e-mailadres vereist"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Bericht moet minstens 10 karakters zijn"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
