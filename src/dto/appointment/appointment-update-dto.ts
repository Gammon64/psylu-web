import { AppointmentStatus } from "@/generated/prisma/enums";
import { AppointmentCreateDTO } from "./appointment-create-dto";

export type AppointmentUpdateDTO = AppointmentCreateDTO & {
  status: AppointmentStatus;
  notes?: string;
};
