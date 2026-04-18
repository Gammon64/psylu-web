import { PatientCreateDTO } from "@/dto/patient/patient-create-dto";
import { PatientUpdateDTO } from "@/dto/patient/patient-update-dto";
import { validateAndExecute } from "@/lib/zod";
import { PatientRepository } from "./patient-repository";
import { createPatientSchema, updatePatientSchema } from "./patient-schema";

export class PatientService {
  constructor(private repository: PatientRepository) {}

  async create(data: PatientCreateDTO, userId: string | undefined) {
    if (!userId) throw new Error("Unauthorized");

    return validateAndExecute(
      createPatientSchema,
      data,
      async (parsed) =>
        await this.repository.create({
          ...parsed,
          userId,
        }),
    );
  }

  async update(id: string, data: PatientUpdateDTO, userId: string | undefined) {
    await this.getById(id, userId);

    return validateAndExecute(
      updatePatientSchema,
      data,
      async (parsed) => await this.repository.update(id, parsed),
    );
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
