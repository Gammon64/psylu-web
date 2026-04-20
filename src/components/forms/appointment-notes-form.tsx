"use client";

import { AppointmentGetPayload } from '@/generated/prisma/models';
import useDebounce from '@/hooks/use-debounce';
import { AppointmentNotesFormState } from '@/modules/appointment/appointment-schema';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Button from '../ui/button';

type AppointmentNotesFormProps = {
    action: (state: AppointmentNotesFormState, data: FormData) => Promise<AppointmentNotesFormState>;
    appointment: AppointmentGetPayload<{
        include: {
            patient: true;
        }
    }>;
}

const AppointmentNotesForm = ({ action, appointment }: AppointmentNotesFormProps) => {
    const [notes, setNotes] = useState(appointment.notes || "");
    const [pending, setPending] = useState(false);
    const initialState: AppointmentNotesFormState = {
        notes: appointment.notes || "",
    }

    const debouncedNotes = useDebounce(notes, 1500);

    useEffect(() => {
        if (debouncedNotes === appointment.notes) return;

        const save = async () => {
            const res = await fetch(`/api/appointments/${appointment.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ notes: debouncedNotes })
            });

            if (!res.ok) {
                toast.error("Erro ao salvar automaticamente");
            }
        }

        save();
    }, [debouncedNotes])

    const formAction = async (data: FormData) => {
        setPending(true);

        const res = await fetch(`/api/appointments/${appointment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ notes: debouncedNotes })
        });

        if (!res.ok) {
            toast.error("Erro ao salvar automaticamente");
        }
        if (!res.ok)
            toast.error("Erro ao salvar anamnese!");

        setPending(false);
        toast.success("Anamnese salva com sucesso!");
    }

    return (
        <form action={formAction} className="flex flex-col gap-4">

            <textarea
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Escreva aqui as observações da consulta..."
                className="min-h-52 p-3 border rounded-lg"
            />
            <span className="text-sm text-gray-500 self-end">
                {appointment.updatedAt
                    ? `Último salvamento: ${new Date(appointment.updatedAt).toLocaleString()}`
                    : "Nenhuma nota salva ainda."}
            </span>

            <Button type="submit" loading={pending}>
                Salvar anamnese
            </Button>
        </form>
    )
}

export default AppointmentNotesForm