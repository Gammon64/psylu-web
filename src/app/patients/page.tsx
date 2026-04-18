import { getSession } from "@/lib/auth";
import { PatientServiceBuilder } from "@/modules/patient";
import Link from "next/link";

async function getPatients() {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    return await PatientServiceBuilder().list(session?.user.id);
}

const PatientsPage = async () => {
    const patients = await getPatients();

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Pacientes</h1>

            <Link
                href="/patients/new"
                className="block p-3 bg-green-600 text-white rounded-lg text-center"
            >
                + Novo paciente
            </Link>

            <div className="space-y-3 w-full">
                {patients.length === 0 && (
                    <p className="text-gray-500">
                        Nenhum paciente cadastrado ainda.
                    </p>
                )}

                {patients.map((p) => (
                    <div
                        key={p.id}
                        className="p-4 border rounded-xl"
                    >
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-sm text-gray-500">
                            {p.email || "Sem email cadastrado"}
                        </p>
                        <p className="text-sm text-gray-500">
                            {p.phone || "Sem telefone cadastrado"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PatientsPage