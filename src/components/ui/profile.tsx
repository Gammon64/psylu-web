import { ProfileServiceBuilder } from "@/modules/profile";
import Image from "next/image";

const Profile = async ({ userId }: { userId: string }) => {
    const profile = await ProfileServiceBuilder().getByUserId(userId);
    if (!profile) return null;

    return (
        <div className="flex gap-2 h-full justify-center items-center">
            {profile.logoUrl && <Image src={profile.logoUrl} alt="Profile" width={40} height={40} />}
            <span className="text-sm font-semibold">{profile.displayName}</span>
        </div>
    )
}

export default Profile