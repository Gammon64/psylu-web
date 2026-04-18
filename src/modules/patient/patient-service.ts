import { PatientCreateDTO } from "@/dto/patient/patient-create-dto";
import { ZodErrorTree } from "@/lib/zod";
import { PatientRepository } from "./patient-repository";
import { createPatientSchema, updatePatientSchema } from "./patient-schema";

export class PatientService {
  constructor(private repository: PatientRepository) {}

  async create(data: PatientCreateDTO, userId: string | undefined) {
    if (!userId) throw new Error("Unauthorized");

    const parsed = createPatientSchema.safeParse(data);

    if (parsed.success) {
      const res = await this.repository.create({
        ...parsed.data,
        userId,
      });
      return { ...res, success: true };
    } else {
      return {
        ...data,
        error: ZodErrorTree(parsed.error),
      };
    }
  }

  async update(id: string, data: unknown, userId: string | undefined) {
    await this.getById(id, userId);

    const parsed = updatePatientSchema.parse(data);

    return this.repository.update(id, parsed);
  }

  async delete(id: string, userId: string | undefined) {
    await this.getById(id, userId);

    return this.repository.softDelete(id);
  }

  async list(userId: string | undefined) {
    if (!userId) throw new Error("Unauthorized");

    return this.repository.findAll(userId);
  }

  async getById(id: string, userId: string | undefined) {
    const patient = await this.repository.findById(id);

    if (!patient || patient.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return patient;
  }
}
