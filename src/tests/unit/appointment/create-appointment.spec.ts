import { AppointmentCreateDTO } from "@/dto/appointment/appointment-create-dto";
import { AppointmentService } from "@/modules/appointment/appointment-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Create Appointment", () => {
  let service: AppointmentService;
  let repository: any;

  beforeEach(() => {
    repository = {
      create: vi.fn(),
      findByScheduledAtAndUserId: vi.fn(),
    };

    service = new AppointmentService(repository);
  });

  it("should create an appointment successfully", async () => {
    const input: AppointmentCreateDTO = {
      patientId: "patient-1",
      scheduledAt: new Date("2026-04-24T09:20:00.000Z"),
      durationMin: 60,
    };

    repository.create.mockResolvedValue({
      id: "1",
      ...input,
    });

    const result = await service.create(input, "user-1");

    expect(result).toHaveProperty("id");
    expect(repository.create).toHaveBeenCalled();
  });

  it("should not create appointment without patientId", async () => {
    const input: AppointmentCreateDTO = {
      patientId: "",
      scheduledAt: new Date("2026-04-24T09:20:00.000Z"),
      durationMin: 60,
    };

    await expect(service.create(input, "user-1")).resolves.toMatchObject({
      error: {
        properties: {
          patientId: {
            errors: expect.arrayContaining(["Paciente é obrigatório"]),
          },
        },
      },
    });
  });

  it("should not create appointment with occupied scheduledAt", async () => {
    const input1: AppointmentCreateDTO = {
      patientId: "patient-1",
      scheduledAt: new Date("2026-04-24T09:20:00.000Z"),
      durationMin: 60,
    };

    const input2: AppointmentCreateDTO = {
      patientId: "patient-2",
      scheduledAt: new Date("2026-04-24T09:20:00.000Z"),
      durationMin: 60,
    };

    repository.findByScheduledAtAndUserId.mockResolvedValueOnce({
      id: "1",
      ...input1,
    });

    await expect(service.create(input2, "user-1")).resolves.toMatchObject({
      error: {
        errors: expect.arrayContaining(["Horário já ocupado"]),
      },
    });
  });
});
