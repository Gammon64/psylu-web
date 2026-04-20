export type AppointmentCreateDTO = {
  patientId: string;
  scheduledAt: Date; // ISO
  durationMin: number;
};
