import { AppointmentCreateDTO } from "./appointment-create-dto";

export type AppointmentUpdateDTO = AppointmentCreateDTO & {
  notes?: string;
};
