import { PatientRepository } from "./patient-repository";
import { createPatientSchema, updatePatientSchema } from "./patient-schema";

export class PatientService {
  constructor(private repository: PatientRepository) {}

  async create(data: unknown, userId: string | undefined) {
    if (!userId) throw new Error("Unauthorized");

    const parsed = createPatientSchema.parse(data);

    return this.repository.create({
      ...parsed,
      userId,
    });
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
