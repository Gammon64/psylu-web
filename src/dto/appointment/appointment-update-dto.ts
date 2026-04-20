import { AppointmentCreateDTO } from "./appointment-create-dto";

export enum AppointmentStatus {
  SCHEDULED,
  COMPLETED,
  CANCELED,
}

export type AppointmentUpdateDTO = AppointmentCreateDTO & {
  status: AppointmentStatus;
  notes?: string;
};
