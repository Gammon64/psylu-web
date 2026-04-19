import { AppointmentService } from "@/modules/appointment/appointment-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Delete Appointment", () => {
  let service: AppointmentService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findById: vi.fn(),
      delete: vi.fn(),
    };

    service = new AppointmentService(repository);
  });

  it("should delete appointment", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-1",
    });

    await service.delete("1", "user-1");

    expect(repository.delete).toHaveBeenCalledWith("1");
  });

  it("should not delete appointment from another user", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-2",
    });

    await expect(service.delete("1", "user-1")).rejects.toThrow("Unauthorized");
  });
});
