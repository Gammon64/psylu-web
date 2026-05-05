import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!);

export async function getSignedWriteUrl(filename: string, mimeType: string) {
  const [url] = await bucket.file(filename).getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 1000 * 60 * 5, // 5 min
    contentType: mimeType,
  });

  return {
    url,
    fileUrl: `https://storage.googleapis.com/${bucket.name}/${filename}`,
  };
}

export async function getSignedReadUrl(fileUrl: string) {
  const filePath = fileUrl.split(`${bucket.name}/`)[1];

  if (!filePath) return null;

  const [url] = await bucket.file(filePath).getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + 1000 * 60 * 60, // 1h
  });

  return url;
}

export async function deleteFile(fileUrl: string) {
  const filePath = fileUrl.split(`${bucket.name}/`)[1];

  if (!filePath) return;

  await bucket.file(filePath).delete();
}
