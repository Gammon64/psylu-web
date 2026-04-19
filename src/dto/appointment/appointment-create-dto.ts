export enum AppointmentStatus {
  SCHEDULED,
  COMPLETED,
  CANCELED,
}

export type AppointmentCreateDTO = {
  patientId: string;
  scheduledAt: Date; // ISO
  durationMin: number;
  status: AppointmentStatus;
};
