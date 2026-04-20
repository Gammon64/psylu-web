import Link from "next/link"

const DashboardPage = () => {
    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">
                Olá! 👋
            </h1>

            <p className="text-gray-600">
                O que você gostaria de fazer hoje?
            </p>

            <div className="flex flex-col p-4 gap-4 shadow-2xl rounded">
                <Link
                    href="/patients"
                    className="p-4 bg-blue-600 text-white rounded-xl text-center text-lg"
                >
                    Ver pacientes
                </Link>

                <Link
                    href="/patients/new"
                    className="p-4 bg-green-600 text-white rounded-xl text-center text-lg"
                >
                    Novo paciente
                </Link>
            </div>
            <div className="flex flex-col p-4 gap-4 shadow-2xl rounded">
                <Link
                    href="/appointments"
                    className="p-4 bg-blue-600 text-white rounded-xl text-center text-lg"
                >
                    Ver consultas
                </Link>

                <Link
                    href="/appointments/new"
                    className="p-4 bg-green-600 text-white rounded-xl text-center text-lg"
                >
                    Nova consulta
                </Link>
            </div>
        </div>
    )
}

export default DashboardPage