import { AppointmentRepository } from "./appointment-repository";
import { AppointmentService } from "./appointment-service";

export function AppointmentServiceBuilder() {
  return new AppointmentService(new AppointmentRepository());
}
