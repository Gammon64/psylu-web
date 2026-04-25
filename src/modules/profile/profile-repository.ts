import { prisma } from "@/lib/prisma";

export class ProfileRepository {
  async upsert(data: any, userId: string | undefined) {
    return prisma.profile.upsert({
      where: { userId },
      update: data,
      create: {
        ...data,
        userId,
      },
    });
  }

  async findById(id: string) {
    return prisma.profile.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    return prisma.profile.findUnique({
      where: { userId },
    });
  }
}
