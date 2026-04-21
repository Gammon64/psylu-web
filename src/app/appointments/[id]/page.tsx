import AppointmentNotesForm from '@/components/forms/appointment-notes-form';
import { getSession } from '@/lib/auth';
import { formatFullDate } from '@/lib/date';
import { AppointmentServiceBuilder } from '@/modules/appointment';


const getAppointment = async (id: string) => {
    const session = await getSession();

    return await AppointmentServiceBuilder().getById(id, session.user.id);
}

const AppointmentPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const appointment = await getAppointment((await params).id);

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">

            <div>
                <h1 className="text-xl font-bold">
                    {appointment.patient?.name}
                </h1>

                <p className="text-sm text-gray-500">
                    {formatFullDate(appointment.scheduledAt)}
                </p>
            </div>

            <AppointmentNotesForm appointment={appointment} />
        </div>
    )
}

export default AppointmentPage