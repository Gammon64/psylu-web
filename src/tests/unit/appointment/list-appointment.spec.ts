import { AppointmentService } from "@/modules/appointment/appointment-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("List Appointment", () => {
  let service: AppointmentService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findAll: vi.fn(),
    };

    service = new AppointmentService(repository);
  });

  it("should return only active appointments from patient", async () => {
    repository.findAll.mockResolvedValue([
      { id: "1", isActive: true, patientId: "patient-1" },
    ]);

    const result = await service.list("patient-1", "user-1");

    expect(result.length).toBe(1);
  });
});
