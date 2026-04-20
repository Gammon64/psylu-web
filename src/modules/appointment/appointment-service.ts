import { AppointmentCreateDTO } from "@/dto/appointment/appointment-create-dto";
import { validateAndExecute } from "@/lib/zod";
import { AppointmentRepository } from "./appointment-repository";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "./appointment-schema";

export class AppointmentService {
  constructor(private repository: AppointmentRepository) {}

  async create(data: AppointmentCreateDTO, userId: string | undefined) {
    if (!userId) throw new Error("Unauthorized");

    return validateAndExecute(
      createAppointmentSchema,
      data,
      async (parsed) =>
        await this.repository.create({
          ...parsed,
          userId,
        }),
    );
  }

  async update(id: string, data: any, userId: string | undefined) {
    await this.getById(id, userId);

    return validateAndExecute(
      updateAppointmentSchema,
      data,
      async (parsed) => await this.repository.update(id, parsed),
    );
  }

  async delete(id: string, userId: string | undefined) {
    await this.getById(id, userId);

    return this.repository.delete(id);
  }

  async list(patientId: string, userId: string | undefined) {
    if (!userId) throw new Error("Unauthorized");

    return this.repository.findAll(patientId);
  }

  async listByDay(date: Date, userId: string | undefined){
    if (!userId) throw new Error("Unauthorized");

    return this.repository.findByScheduledAtAndUserId(date, userId);
  }

  async getById(id: string, userId: string | undefined) {
    const appointment = await this.repository.findById(id);

    if (!appointment || appointment.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return appointment;
  }
}
