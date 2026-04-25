import { getSession } from "@/lib/auth";
import { getBrowser } from "@/lib/pdf/browser";
import { generatePatientReportHTML } from "@/lib/pdf/template";
import { PatientServiceBuilder } from "@/modules/patient";
import { ProfileServiceBuilder } from "@/modules/profile";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  //   TODO: Buscar o perfil do usuário
  const psychologist = await ProfileServiceBuilder().getByUserId(
    session.user.id,
  );
  if (!psychologist) throw new Error("Perfil do psicólogo não encontrado");

  const patient = await PatientServiceBuilder().getByIdWithHistory(
    (await params).id,
    session.user.id,
  );

  if (!patient) {
    return NextResponse.json(
      { error: "Paciente não encontrado" },
      { status: 404 },
    );
  }

  const html = generatePatientReportHTML({
    patient,
    appointments: patient.appointments,
    psychologist,
  });

  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "load" });

  const pdf = await page.pdf({
    format: "a4",
    printBackground: true,
  });

  const pdfData = new Uint8Array(pdf);

  await browser.close();

  return new NextResponse(pdfData, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="relatorio-${patient.name}.pdf"`,
    },
  });
}
