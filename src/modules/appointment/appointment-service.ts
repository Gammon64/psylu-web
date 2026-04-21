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

    // Confere se o horário já está ocupado
    const existing = await this.repository.findByScheduledAtAndUserId(
      data.scheduledAt,
      userId,
    );

    if (existing) {
      return {
        error: {
          errors: ["Horário já ocupado"],
        },
      };
    }

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

  async listByDay(date: Date, userId: string | undefined, patientId?: string) {
    if (!userId) throw new Error("Unauthorized");

    return this.repository.findByDayAndUserId(date, userId, patientId);
  }

  async getById(id: string, userId: string | undefined) {
    const appointment = await this.repository.findById(id);

    if (!appointment || appointment.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return appointment;
  }
}
