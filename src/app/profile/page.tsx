import ProfileForm from "@/components/forms/profile-form";
import H1 from "@/components/ui/h1";
import { ProfileUpdateDTO } from "@/dto/profile/profile-update-dto";
import { getSession } from "@/lib/auth";
import { ProfileServiceBuilder } from "@/modules/profile";
import { ProfileFormState } from "@/modules/profile/profile-schema";

const getProfile = async () => {
    const session = await getSession();

    return await ProfileServiceBuilder().getByUserId(session?.user.id);
}
const ProfilePage = async () => {
    const profile = await getProfile();

    const updateProfile = async (state: ProfileFormState, data: FormData) => {
        "use server";

        const session = await getSession();

        // TODO: better handle to optional empty fields
        const profileData: ProfileUpdateDTO = {
            displayName: String(data.get("displayName")),
            crp: String(data.get("crp")),
            logoUrl: String(data.get("logoUrl")),
            signatureUrl: String(data.get("signatureUrl")),
            primaryColor: String(data.get("primaryColor")),
            secondaryColor: String(data.get("secondaryColor"))
        }

        return await ProfileServiceBuilder().update(profileData, session?.user.id);
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <H1>
                {profile ? profile.displayName : "Antes de começar, precisamos configurar seu perfil profissional."}
            </H1>

            <ProfileForm action={updateProfile} profile={profile} />
        </div>
    )
}

export default ProfilePage