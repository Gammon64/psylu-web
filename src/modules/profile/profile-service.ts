import { ProfileUpdateDTO } from "@/dto/profile/profile-update-dto";
import { getSignedReadUrl } from "@/lib/gcs";
import { validateAndExecute } from "@/lib/zod";
import { ProfileRepository } from "./profile-repository";
import { updateProfileSchema } from "./profile-schema";

export class ProfileService {
  constructor(private repository: ProfileRepository) {}

  async update(data: ProfileUpdateDTO, userId: string | undefined) {
    if (!userId) throw new Error("Unauthorized");

    return validateAndExecute(
      updateProfileSchema,
      data,
      async (parsed) => await this.repository.upsert(parsed, userId),
    );
  }

  async getById(id: string, userId: string | undefined) {
    const profile = await this.repository.findById(id);

    if (!profile || profile.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return profile;
  }

  async getByUserId(userId: string | undefined) {
    if (!userId) throw new Error("Unauthorized");

    const profile = await this.repository.findByUserId(userId);

    if (!profile) throw new Error("Not found");

    // Carrega URL de leitura
    return {
      ...profile,
      logoPreviewUrl: profile?.logoUrl?.includes("googleapis")
        ? await getSignedReadUrl(profile.logoUrl)
        : profile.logoUrl,
      signaturePreviewUrl: profile?.signatureUrl?.includes("googleapis")
        ? await getSignedReadUrl(profile.signatureUrl)
        : profile.signatureUrl,
    };
  }
}
