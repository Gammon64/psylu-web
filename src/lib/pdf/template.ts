import { Appointment, Patient, Profile } from "@/generated/prisma/client";
import { formatDate } from "date-fns";
import { formatFullDate } from "../date";
import { sanitize } from "./utils";

export function generatePatientReportHTML(data: {
  patient: Patient;
  appointments: Appointment[];
  psychologist: Profile;
}) {
  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #333;
        }

        h1 {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .header {
          margin-bottom: 20px;
        }

        .section {
          margin-bottom: 20px;
        }

        .appointment {
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ddd;
          page-break-inside: avoid;
        }

        .signature {
          margin-top: 60px;
        }
      </style>
    </head>

    <body>
      <div class="header">
        <h1>${data.patient.name}</h1>
        <p>Data de nascimento: ${data.patient.birthDate && formatDate(data.patient.birthDate, "dd/MM/yyyy")}</p>
        <p>Contato: ${data.patient.phone}</p>
      </div>

      <div class="section">
        <h2>Histórico de consultas</h2>

        ${data.appointments
          .map(
            (a: Appointment) => `
          <div class="appointment">
            <strong>${formatFullDate(a.scheduledAt)}</strong>
            <p>${sanitize(a.notes)}</p>
          </div>
        `,
          )
          .join("")}
      </div>

      <div class="signature">
        <img src="${data.psychologist.signatureUrl}" height="80" />
        <p>${data.psychologist.displayName}</p>
        <p>CRP: ${data.psychologist.crp}</p>
      </div>
    </body>
  </html>
  `;
}
