"use client";

import { PatientFormState } from '@/modules/patient/patient-schema';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import Button from '../ui/button';
import FormError from '../ui/form-error';
import FormField from '../ui/form-field';
import Input from '../ui/input';

type PatientFormProps = {
    action: (state: PatientFormState, data: FormData) => Promise<PatientFormState>;
}

const PatientForm = ({ action }: PatientFormProps) => {
    const initialState: PatientFormState = {
        name: ""
    }

    const [state, formAction, pending] = useActionState(action, initialState);

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast.message("Paciente criado com sucesso!");
            router.push("/patients");
        }
    }, [state.success]);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4"
        >
            <FormField label='Nome' >
                <Input
                    name="name"
                    defaultValue={state.name}
                    error={!!state.error && !state.name}
                    required
                />
            </FormField>

            <FormField label='Email' >
                <Input
                    name="email"
                    type="email"
                    defaultValue={state.email || undefined}
                    error={!!state.error && !state.email}
                />
            </FormField>

            <FormField label='Telefone' >
                <Input
                    name="phone"
                    type="tel"
                    defaultValue={state.phone || undefined}
                    error={!!state.error && !state.phone}
                />
            </FormField>

            <FormError message={state.error} />

            <Button
                type="submit"
                loading={pending}
            >
                Salvar paciente
            </Button>
        </form>
    )
}

export default PatientForm