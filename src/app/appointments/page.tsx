import AppointmentList from "@/components/lists/appointment-list"
import { addDays, formatDateParam, formatFullDate, parseDateParam } from "@/lib/date"
import Link from "next/link"



const AppointmentsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) => {
    const currentDate = parseDateParam((await searchParams).date)

    const prevDate = addDays(currentDate, -1)
    const nextDate = addDays(currentDate, 1)

    return (
        <>
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
            <AppointmentList date={currentDate} />
        </>
    )
}

export default AppointmentsPage