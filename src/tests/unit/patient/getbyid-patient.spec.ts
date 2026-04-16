import { PatientService } from "@/modules/patient/patient-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Get Patient", () => {
  let service: PatientService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findById: vi.fn(),
    };

    service = new PatientService(repository);
  });

  it("should return patient", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-1",
    });

    const result = await service.getById("1", "user-1");

    expect(result.id).toBe("1");
  });

  it("should not return patient from another user", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-2",
    });

    await expect(service.getById("1", "user-1")).rejects.toThrow(
      "Unauthorized",
    );
  });
});
