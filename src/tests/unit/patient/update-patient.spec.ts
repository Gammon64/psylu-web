import { PatientService } from "@/modules/patient/patient-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Update Patient", () => {
  let service: PatientService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findById: vi.fn(),
      update: vi.fn(),
    };

    service = new PatientService(repository);
  });

  it("should update patient successfully", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-1",
    });

    repository.update.mockResolvedValue({
      id: "1",
      name: "Updated Name",
    });

    const result = await service.update(
      "1",
      { name: "Updated Name" },
      "user-1",
    );

    expect(result.name).toBe("Updated Name");
  });

  it("should not update patient from another user", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-2",
    });

    await expect(
      service.update("1", { name: "Test" }, "user-1"),
    ).rejects.toThrow("Unauthorized");
  });
});
