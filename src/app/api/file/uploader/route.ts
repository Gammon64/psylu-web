import { deleteFile, getSignedWriteUrl } from "@/lib/gcs";

export async function POST(req: Request) {
  const { fileName, mimeType } = await req.json();
  const filename = `${Date.now()}-${fileName}`;

  const json = await getSignedWriteUrl(filename, mimeType);

  return Response.json(json);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("fileUrl");

  if (!fileUrl) {
    return Response.json({ error: "fileUrl is required" }, { status: 400 });
  }

  try {
    await deleteFile(fileUrl);

    return Response.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return Response.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
