import { Prisma } from "@/generated/prisma/client";
import { z } from "zod";

export type PatientFormState = Prisma.PatientCreateWithoutUserInput & {
  success?: boolean;
  error?: string;
};
export const createPatientSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.email({ error: "Email inválido" }).optional().or(z.literal("")),
  phone: z.string().min(11, "Telefone inválido").optional().or(z.literal("")),
  birthDate: z.date({ error: "Data de nascimento inválida" }).optional(),
  notes: z.string().optional(),
});

export const updatePatientSchema = createPatientSchema.partial();
