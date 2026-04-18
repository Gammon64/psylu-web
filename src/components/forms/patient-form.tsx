"use client";

import { PatientFormState } from '@/modules/patient/patient-schema';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

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
            alert("Paciente criado com sucesso!");
            router.push("/patients");
        }
    }, [state.success]);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4"
        >
            <input
                id="name"
                name="name"
                placeholder="Nome completo"
                defaultValue={state.name}
                className="p-3 border rounded-lg"
                required
            />

            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email (opcional)"
                defaultValue={state.email || undefined}
                className="p-3 border rounded-lg"
            />

            <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Telefone (opcional)"
                defaultValue={state.phone || undefined}
                className="p-3 border rounded-lg"
            />

            {state.error && (
                <span className='text-sm text-red-500'>{state.error}</span>
            )}

            <button
                type="submit"
                disabled={pending}
                className="p-4 bg-blue-600 text-white rounded-xl text-lg"
            >
                {pending ? "Salvando..." : "Salvar paciente"}
            </button>
        </form>
    )
}

export default PatientForm