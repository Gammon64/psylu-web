import { PatientRepository } from "./patient-repository";
import { PatientService } from "./patient-service";

export function PatientServiceBuilder() {
  return new PatientService(new PatientRepository());
}
