import { prisma } from "@/lib/prisma";

export class PatientRepository {
  async create(data: any) {
    return prisma.patient.create({ data });
  }

  async findById(id: string) {
    return prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: true,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.patient.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.patient.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
  }

  async findAll(userId: string) {
    return prisma.patient.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }
}
