import AppointmentForm from '@/components/forms/appointment-form'
import { AppointmentCreateDTO } from '@/dto/appointment/appointment-create-dto'
import { getSession } from '@/lib/auth'
import { AppointmentServiceBuilder } from '@/modules/appointment'
import { AppointmentFormState } from '@/modules/appointment/appointment-schema'
import { PatientServiceBuilder } from '@/modules/patient'

async function getPatients() {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    return await PatientServiceBuilder().list(session?.user.id);
}

const NewAppointmentPage = async () => {
    const patients = await getPatients()

    const createAppointment = async (state: AppointmentFormState, data: FormData) => {
        "use server"

        const session = await getSession()
        if (!session) return { error: "Unauthorized" }

        try {
            const appointment: AppointmentCreateDTO = {
                patientId: String(data.get("patientId")),
                scheduledAt: new Date(String(data.get("scheduledAt"))),
                durationMin: Number(data.get("durationMin")),
            }

            return await AppointmentServiceBuilder().create(
                appointment,
                session.user.id
            )

        } catch (err: any) {
            return { error: err.message }
        }
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">
                Nova consulta
            </h1>

            <AppointmentForm action={createAppointment} patients={patients} />
        </div>
    )
}

export default NewAppointmentPage