import { prisma } from "@/lib/prisma";

export class AppointmentRepository {
  async create(data: any) {
    return prisma.appointment.create({ data });
  }

  async findById(id: string) {
    return prisma.appointment.findUnique({
      where: { id },
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
}
