export type PatientCreateDTO = {
  name: string;
  email?: string | null;
  phone?: string | null;
  birthDate?: Date | null;
};
