import { AppointmentService } from "@/modules/appointment/appointment-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Update Appointment", () => {
  let service: AppointmentService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findById: vi.fn(),
      update: vi.fn(),
    };

    service = new AppointmentService(repository);
  });

  it("should update appointment successfully", async () => {
    repository.findById.mockResolvedValue({
      id: "1",
      userId: "user-1",
    });

    repository.update.mockResolvedValue({
      id: "1",
      scheduledAt: "Updated ScheduledAt",
    });

    const result = await service.update(
      "1",
      { scheduledAt: "Updated ScheduledAt" },
      "user-1",
    );

    expect(result.scheduledAt).toBe("Updated ScheduledAt");
  });
});
