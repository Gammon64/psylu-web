import { z } from "zod";

export const createPatientSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.email().optional(),
  phone: z.string().optional(),
  birthDate: z.date().optional(),
  notes: z.string().optional(),
});

export const updatePatientSchema = createPatientSchema.partial();
