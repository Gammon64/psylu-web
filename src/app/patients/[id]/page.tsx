import PatientForm from "@/components/forms/patient-form";
import AppointmentList from "@/components/lists/appointment-list";
import Button from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { getSession } from "@/lib/auth";
import { PatientServiceBuilder } from "@/modules/patient";
import { PatientFormState } from "@/modules/patient/patient-schema";
import Link from "next/link";

const getPatient = async (id: string) => {
    const session = await getSession();

    return await PatientServiceBuilder().getById(id, session?.user?.id);
}

const PatientPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const patient = await getPatient((await params).id);

    const updatePatient = async (state: PatientFormState, data: FormData) => {
        "use server";

        const session = await getSession();

        const patientData = {
            name: String(data.get("name")),
            email: String(data.get("email")),
            phone: String(data.get("phone")),
            birthDate: new Date(String(data.get("birthDate")))
        }

        return await PatientServiceBuilder().update(patient.id, patientData, session?.user?.id);
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <H1>
                {patient.name}
            </H1>

            <PatientForm action={updatePatient} patient={patient} />

            <h2>Consultas</h2>

            <div>
                <Link
                    href={`/api/report/patient/${patient.id}`}
                    target="_blank">
                    <Button>
                        Gerar Relatório
                    </Button>
                </Link>
            </div>

            <AppointmentList patient={patient} />
        </div>
    )
}

export default PatientPage