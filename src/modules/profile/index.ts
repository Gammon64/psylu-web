import { ProfileRepository } from "./profile-repository";
import { ProfileService } from "./profile-service";

export function ProfileServiceBuilder() {
  return new ProfileService(new ProfileRepository());
}
