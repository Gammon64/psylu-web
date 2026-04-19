import { AppointmentService } from "@/modules/appointment/appointment-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Get Appointment", () => {
  let service: AppointmentService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findById: vi.fn(),
    };

    service = new AppointmentService(repository);
  });

  it("should return appointment", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-1",
    });

    const result = await service.getById("1", "user-1");

    expect(result.id).toBe("1");
  });

  it("should not return appointment from another user", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-2",
    });

    await expect(service.getById("1", "user-1")).rejects.toThrow("Unauthorized");
  });
});
