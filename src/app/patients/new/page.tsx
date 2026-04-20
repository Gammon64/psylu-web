import PatientForm from "@/components/forms/patient-form";
import H1 from "@/components/ui/h1";
import { getSession } from "@/lib/auth";
import { PatientServiceBuilder } from "@/modules/patient";
import { PatientFormState } from "@/modules/patient/patient-schema";



const NewPatientPage = () => {
    const createPatient = async (state: PatientFormState, data: FormData) => {
        "use server";

        // TODO: tratar campos opcionais corretamente, enviar campos em branco como undefined para a API
        const patient = {
            name: String(data.get("name")),
            email: String(data.get("email")),
            phone: String(data.get("phone")),
            birthDate: new Date(String(data.get("birthDate")))
        }

        const session = await getSession();
        return await PatientServiceBuilder().create(patient, session?.user?.id);
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <H1>
                Novo paciente
            </H1>

            <PatientForm action={createPatient} />
        </div>
    )
}

export default NewPatientPage