"use client"

import { Profile } from "@/generated/prisma/client";
import { ProfileFormState } from "@/modules/profile/profile-schema";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Button from "../ui/button";
import ColorPicker from "../ui/color-picker";
import FormError from "../ui/form-error";
import FormField from "../ui/form-field";
import Input from "../ui/input";
import ImageUploader from "../ui/image-uploader";

type ProfileFormProps = {
    action: (state: ProfileFormState, data: FormData) => Promise<ProfileFormState>;
    profile?: Profile | null;
}

const ProfileForm = ({ action, profile }: ProfileFormProps) => {
    const initialState: ProfileFormState = profile ?? {
        displayName: ""
    }

    const [state, formAction, pending] = useActionState(action, initialState);

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast.success("Perfil atualizado com sucesso!");
            router.push("/dashboard");
        }
    }, [state.success])
    return (
        <form action={formAction} className="flex flex-col gap-4">
            <FormField label="Nome de Exibição">
                <Input
                    name="displayName"
                    defaultValue={state.displayName}
                    error={state.error?.properties?.displayName}
                    required
                />
            </FormField>

            <FormField label="CRP">
                <Input
                    name="crp"
                    defaultValue={state.crp ?? ""}
                    error={state.error?.properties?.crp}
                />
            </FormField>

            <FormField label="URL do Logo">
                <ImageUploader
                    name="logoUrl"
                    defaultValue={state.logoUrl ?? ""}
                    error={state.error?.properties?.logoUrl}
                />
            </FormField>

            <FormField label="URL da Assinatura">
                <ImageUploader
                    name="signatureUrl"
                    defaultValue={state.signatureUrl ?? ""}
                    error={state.error?.properties?.signatureUrl}
                />
            </FormField>

            <FormField label="Cor Primária">
                <ColorPicker
                    name="primaryColor"
                    value={state.primaryColor ?? ""}
                    error={state.error?.properties?.primaryColor}
                />
            </FormField>

            <FormField label="Cor Secundária">
                <ColorPicker
                    name="secondaryColor"
                    value={state.secondaryColor ?? ""}
                    error={state.error?.properties?.secondaryColor}
                />
            </FormField>

            <FormError errors={state.error?.errors} />

            <Button
                type="submit"
                loading={pending}
            >
                Salvar perfil
            </Button>
        </form>
    )
}

export default ProfileForm