import { Patient } from '@/generated/prisma/client'
import { getSession } from '@/lib/auth'
import { formatFullDate, formatHour } from '@/lib/date'
import { AppointmentServiceBuilder } from '@/modules/appointment'
import Link from 'next/link'
import Card from '../ui/card'
import EmptyState from '../ui/empty-state'

async function getAppointments(day: Date | undefined, patientId?: string) {
    const session = await getSession()

    if (day)
        return AppointmentServiceBuilder().listByDay(
            day,
            session.user.id,
            patientId
        )
    else if (patientId)
        return AppointmentServiceBuilder().list(patientId, session.user.id)
    else return []
}

type AppointmentListProps = {
    date?: Date;
    patient?: Patient;
}

const AppointmentList = async ({ date, patient }: AppointmentListProps) => {


    const appointments = await getAppointments(date, patient?.id)
    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">


            <Link
                href="/appointments/new"
                className="block p-3 bg-green-600 text-white rounded-lg text-center"
            >
                + Nova consulta
            </Link>

            {appointments.length === 0 ? (
                <EmptyState
                    title="Nenhuma consulta hoje"
                    description="Agende sua primeira consulta"
                    actionLabel="Nova consulta"
                    actionHref="/appointments/new"
                />
            ) : (
                <div className="space-y-3">
                    {appointments.map((a) => (
                        <Card key={a.id} href={`/appointments/${a.id}`}>
                            <p className="font-semibold">
                                {formatFullDate(a.scheduledAt)}
                            </p>
                            <p className="font-semibold">
                                {formatHour(a.scheduledAt)}
                            </p>

                            <p className="text-sm text-gray-600">
                                {a.patient?.name}
                            </p>

                            <p className="text-xs text-gray-400">
                                {a.durationMin} minutos
                            </p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AppointmentList