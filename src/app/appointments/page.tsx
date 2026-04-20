import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { getSession } from "@/lib/auth"
import { addDays, formatDateParam, formatFullDate, formatHour, parseDateParam } from "@/lib/date"
import { AppointmentServiceBuilder } from "@/modules/appointment"
import Link from "next/link"

async function getAppointments(day: Date) {
    const session = await getSession()
    if (!session) throw new Error("Unauthorized")


    return AppointmentServiceBuilder().listByDay(
        day,
        session.user.id
    )
}

const AppointmentsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) => {
    const currentDate = parseDateParam((await searchParams).date)

    const prevDate = addDays(currentDate, -1)
    const nextDate = addDays(currentDate, 1)

    const appointments = await getAppointments(currentDate)

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Link
                    href={`/appointments?date=${formatDateParam(prevDate)}`}
                    className="text-blue-600"
                >
                    ←
                </Link>

                <h1 className="text-lg font-semibold capitalize text-center">
                    {formatFullDate(currentDate)}
                </h1>

                <Link
                    href={`/appointments?date=${formatDateParam(nextDate)}`}
                    className="text-blue-600"
                >
                    →
                </Link>
            </div>

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
                        <Card key={a.id}>
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

export default AppointmentsPage