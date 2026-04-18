import PatientForm from "@/components/forms/patient-form";
import { getSession } from "@/lib/auth";
import { PatientServiceBuilder } from "@/modules/patient";
import { PatientFormState } from "@/modules/patient/patient-schema";



const NewPatientPage = () => {
    const createPatient = async (state: PatientFormState, data: FormData) => {
        "use server";

        console.log("🚀 ~ createPatient ~ state:", state)


        const patient = {
            name: String(data.get("name")),
            email: data.get("email") as string,
            phone: data.get("phone") as string
        }

        // TODO: tratar campos opcionais corretamente, enviar campos em branco como undefined para a API
        console.log("🚀 ~ createPatient ~ patient:", patient)

        const session = await getSession();
        try {
            const res = await PatientServiceBuilder().create(patient, session?.user?.id);

            return {
                ...res,
                success: true
            };
        }
        catch (err: Error | unknown) {
            if (err instanceof Error)
                return {
                    ...state,
                    error: err.message
                }
            return {
                ...state,
                error: "Ocorreu um erro inesperado"
            }
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">
                Novo paciente
            </h1>

            <PatientForm action={createPatient} />
        </div>
    )
}

export default NewPatientPage