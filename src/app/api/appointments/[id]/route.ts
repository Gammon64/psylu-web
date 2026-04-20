import { getSession } from "@/lib/auth";
import { AppointmentServiceBuilder } from "@/modules/appointment";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();

  const body = await req.json();

  try {
    const updated = await AppointmentServiceBuilder().update(
      (await params).id,
      body,
      session.user.id,
    );

    return Response.json(updated);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
