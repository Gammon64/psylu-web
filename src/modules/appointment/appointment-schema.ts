import { DefaultState } from "@/types/error-properties";
import { z } from "zod";

export type AppointmentFormState = DefaultState<{
  patientId: string;
  scheduledAt: Date; // ISO
  durationMin: number;
}>;

export const createAppointmentSchema = z.object({
  patientId: z.string().nonempty("Paciente é obrigatório"),
  scheduledAt: z.date({ error: "Data e horário são obrigatórios" }),
  durationMin: z.number().min(50, "Duração mínima de 50 minutos"),
});

export type AppointmentNotesFormState = DefaultState<{
  notes: string;
}>;

export const updateAppointmentSchema = createAppointmentSchema.partial().and(
  z.object({
    notes: z.string().optional(),
  }),
);
