import { ProfileService } from "@/modules/profile/profile-service";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("ProfileService", () => {
  let service: ProfileService;
  let repository: any;

  beforeEach(() => {
    repository = {
      upsert: vi.fn(),
    };

    service = new ProfileService(repository);
  });

  it("should update profile successfully", async () => {
    repository.upsert.mockResolvedValue({
      displayName: "Luciana",
    });

    const result = await service.update(
      {
        displayName: "Luciana",
      },
      "user-1",
    );

    expect(repository.upsert).toHaveBeenCalled();
    expect(result.displayName).toBe("Luciana");
  });

  it("should fail with invalid data", async () => {
    await expect(
      service.update(
        {
          displayName: "",
        },
        "user-1",
      ),
    ).resolves.toMatchObject({
      error: {
        properties: {
          displayName: {
            errors: expect.arrayContaining(["Nome de exibição é obrigatório"]),
          },
        },
      },
    });
  });
});
