import { PatientService } from "@/modules/patient/patient-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Delete Patient", () => {
  let service: PatientService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findById: vi.fn(),
      softDelete: vi.fn(),
    };

    service = new PatientService(repository);
  });

  it("should soft delete patient", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-1",
    });

    await service.delete("1", "user-1");

    expect(repository.softDelete).toHaveBeenCalledWith("1");
  });

  it("should not delete patient from another user", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-2",
    });

    await expect(service.delete("1", "user-1")).rejects.toThrow("Unauthorized");
  });
});
