import { prisma } from "@/lib/prisma";
import { TZDate } from "@date-fns/tz";
import { endOfDay, startOfDay } from "date-fns";

export class AppointmentRepository {
  async create(data: any) {
    return prisma.appointment.create({ data });
  }

  async findById(id: string) {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.appointment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.appointment.delete({
      where: { id },
    });
  }

  async findAll(patientId: string) {
    return prisma.appointment.findMany({
      where: {
        patientId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async findByScheduledAtAndUserId(date: Date, userId: string) {
    return prisma.appointment.findFirst({
      where: {
        scheduledAt: date,
        userId,
      },
    });
  }

  async findByDayAndUserId(date: Date, userId: string) {
    const brazilDate = new TZDate(date, "America/Sao_Paulo");
    const dateInicio = startOfDay(brazilDate);
    const dateFim = endOfDay(brazilDate);

    return prisma.appointment.findMany({
      where: {
        userId,
        scheduledAt: {
          gte: dateInicio,
          lte: dateFim,
        },
        patient: {
          isActive: true,
        },
      },
      include: {
        patient: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });
  }
}
