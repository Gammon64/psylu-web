"use client"

import { Patient } from "@/generated/prisma/client";
import { AppointmentFormState } from "@/modules/appointment/appointment-schema";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Button from "../ui/button";
import FormError from "../ui/form-error";
import FormField from "../ui/form-field";
import Input from "../ui/input";
import Select, { Option } from "../ui/select";

type AppointmentFormProps = {
    action: (state: AppointmentFormState, data: FormData) => Promise<AppointmentFormState>;
    patients: Patient[];
}
const AppointmentForm = ({ action, patients }: AppointmentFormProps) => {
    const initialState: AppointmentFormState = {
        patientId: "",
        scheduledAt: new Date(),
        durationMin: 50
    }

    const [state, formAction, pending] = useActionState(action, initialState);

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast.success("Consulta criada com sucesso!");
            router.push("/appointments");
        }
    }, [state.success])

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <FormField label="ID do paciente">
                <Select
                    name="patientId"
                    defaultValue={state.patientId}
                    error={state.error?.properties?.patientId}
                    required
                >
                    <Option value="">Selecione um paciente</Option>
                    {patients.map((patient) => (
                        <Option key={patient.id} value={patient.id}>
                            {patient.name}
                        </Option>
                    ))}
                </Select>
            </FormField>

            <FormField label="Data e horário">
                <Input
                    type="datetime-local"
                    name="scheduledAt"
                    defaultValue={state.scheduledAt?.toUTCString()}
                    error={state.error?.properties?.scheduledAt}
                    required
                />
            </FormField>

            <FormField label="Duração (minutos)">
                <Input
                    type="number"
                    name="durationMin"
                    defaultValue={state.durationMin}
                    min={50}
                    error={state.error?.properties?.durationMin}
                    required
                />
            </FormField>

            <FormError errors={state.error?.errors} />

            <Button type="submit" loading={pending}>
                Agendar consulta
            </Button>
        </form>
    )
}

export default AppointmentForm