import { describe, it, expect, vi, beforeEach } from "vitest";
import { PatientService } from "@/modules/patient/patient-service";

describe("Create Patient", () => {
  let service: PatientService;
  let repository: any;

  beforeEach(() => {
    repository = {
      create: vi.fn(),
    };

    service = new PatientService(repository);
  });

  it("should create a patient successfully", async () => {
    const input = {
      name: "Maria Silva",
      email: "maria@example.com",
    };

    repository.create.mockResolvedValue({
      id: "1",
      ...input,
    });

    const result = await service.create(input, "user-1");

    expect(result).toHaveProperty("id");
    expect(repository.create).toHaveBeenCalled();
  });

  it("should not create patient without name", async () => {
    const input = {
      name: "",
      email: "maria@example.com",
    };

    // Ao invés de disparar um erro, o método retorna um objeto com campo error com os campos errors: string[] e properties: ErrorProperties<PatientCreateDTO> 
    await expect(service.create(input, "user-1")).resolves.toMatchObject({
      error: {
        properties: {
          name: {
            errors: expect.arrayContaining(["Nome é obrigatório"]),
          },
        },
      },
    });
  });

  it("should attach userId to patient", async () => {
    const input = {
      name: "Maria",
    };

    repository.create.mockResolvedValue({
      id: "1",
      name: "Maria",
      userId: "user-1",
    });

    await service.create(input, "user-1");

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "user-1",
      }),
    );
  });
});
