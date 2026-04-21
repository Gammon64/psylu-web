"use client";

import { AppointmentStatus } from '@/generated/prisma/enums';
import { AppointmentGetPayload } from '@/generated/prisma/models';
import useDebounce from '@/hooks/use-debounce';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Button from '../ui/button';

type AppointmentNotesFormProps = {
    appointment: AppointmentGetPayload<{
        include: {
            patient: true;
        }
    }>;
}

const AppointmentNotesForm = ({ appointment }: AppointmentNotesFormProps) => {
    const [notes, setNotes] = useState(appointment.notes || "");
    const [pending, setPending] = useState(false);

    const debouncedNotes = useDebounce(notes, 1500);
    const router = useRouter();

    const save = async (body: any) => {
        const res = await fetch(`/api/appointments/${appointment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            toast.error("Erro ao salvar anamnese!");
        }

        router.refresh();
    }

    useEffect(() => {
        if (debouncedNotes === appointment.notes) return;
        save({ notes: debouncedNotes });
    }, [debouncedNotes])

    const formAction = async (data: FormData) => {
        setPending(true);

        const body = {
            notes: String(data.get("notes")),
            status: AppointmentStatus.COMPLETED
        }
        await save(body);

        setPending(false);
    }

    const handleCancelAppointment = async () => {
        const body = {
            status: AppointmentStatus.CANCELED
        }

        await save(body);
    }

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <Button
                type='button'
                className='bg-rose-700 hover:bg-rose-900'
                disabled={appointment.status !== AppointmentStatus.SCHEDULED}
                onClick={() => handleCancelAppointment()}>
                Cancelar consulta
            </Button>
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

            <Button type="submit" loading={pending} disabled={appointment.status === AppointmentStatus.CANCELED}>
                Salvar anamnese
            </Button>
        </form>
    )
}

export default AppointmentNotesForm