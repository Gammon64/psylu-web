import Card from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import H1 from "@/components/ui/h1";
import { getSession } from "@/lib/auth";
import { PatientServiceBuilder } from "@/modules/patient";
import Link from "next/link";

async function getPatients() {
    const session = await getSession();

    return await PatientServiceBuilder().list(session?.user.id);
}

const PatientsPage = async () => {
    const patients = await getPatients();

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <H1>Pacientes</H1>

            <Link
                href="/patients/new"
                className="block p-3 bg-green-600 text-white rounded-lg text-center"
            >
                + Novo paciente
            </Link>

            {patients.length === 0 ? (
                <EmptyState
                    title="Nenhum paciente ainda"
                    description="Comece cadastrando seu primeiro paciente"
                    actionLabel="Cadastrar paciente"
                    actionHref="/patients/new"
                />
            ) : (
                <div className="space-y-3 w-full">
                    {patients.map((p) => (
                        <Card key={p.id} href={`/patients/${p.id}`}>
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-sm text-gray-500">
                                {p.email || "Sem email cadastrado"}
                            </p>
                            <p className="text-sm text-gray-500">
                                {p.phone || "Sem telefone cadastrado"}
                            </p>
                        </Card>
                    ))}
                </div>
            )
            }
        </div >
    )
}

export default PatientsPage