import { AppointmentStatus } from "@/dto/appointment/appointment-create-dto";
import { DefaultState } from "@/types/error-properties";
import { z } from "zod";

export type AppointmentFormState = DefaultState<{
  patientId: string;
  scheduledAt: Date; // ISO
  durationMin: number;
  status: string;
}>;

export const createAppointmentSchema = z.object({
  patientId: z.string().nonempty("Paciente é obrigatório"),
  scheduledAt: z.date({ error: "Data e horário são obrigatórios" }),
  durationMin: z.number().min(50, "Duração mínima de 50 minutos"),
  status: z.enum(AppointmentStatus, { error: "Status inválido" }),
});

export const updateAppointmentSchema = createAppointmentSchema.partial().and(
  z.object({
    notes: z.string().optional(),
  }),
);
