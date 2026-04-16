import { PatientService } from "@/modules/patient/patient-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("List Patients", () => {
  let service: PatientService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findAll: vi.fn(),
    };

    service = new PatientService(repository);
  });

  it("should return only active patients", async () => {
    repository.findAll.mockResolvedValue([{ id: "1", isActive: true }]);

    const result = await service.list("user-1");

    expect(result.length).toBe(1);
  });
});
