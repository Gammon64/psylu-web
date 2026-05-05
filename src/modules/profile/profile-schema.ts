import { DefaultState } from "@/types/error-properties";
import { z } from "zod";

export type ProfileFormState = DefaultState<{
  displayName: string;
  crp?: string | null;
  logoUrl?: string | null;
  logoPreviewUrl?: string | null;
  signatureUrl?: string | null;
  signaturePreviewUrl?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
}>;

export const updateProfileSchema = z.object({
  displayName: z.string().nonempty("Nome de exibição é obrigatório"),

  crp: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 5, "CRP inválido"),

  logoUrl: z.url().optional().or(z.literal("")),
  signatureUrl: z.url().optional().or(z.literal("")),

  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
});
