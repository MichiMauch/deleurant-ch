import crypto from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Signed Cloudinary upload proxy.
 * Client posts a file as multipart/form-data; server signs the request with
 * CLOUDINARY_API_SECRET and forwards to Cloudinary. Returns the secure_url
 * and resource_type on success.
 *
 * Required env (server-only):
 *   CLOUDINARY_CLOUD_NAME (or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
 *   CLOUDINARY_API_KEY    (or NEXT_PUBLIC_CLOUDINARY_API_KEY)
 *   CLOUDINARY_API_SECRET
 */
export async function POST(req: Request) {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey =
    process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        error:
          "Cloudinary nicht konfiguriert. .env.local braucht CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY und CLOUDINARY_API_SECRET.",
      },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Kein multipart-Body" },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Kein `file`-Feld im Body" }, { status: 400 });
  }

  const folderRaw = formData.get("folder");
  const folder = typeof folderRaw === "string" && folderRaw.length > 0 ? folderRaw : undefined;

  const timestamp = Math.floor(Date.now() / 1000).toString();
  // Cloudinary signature: alphabetically-sorted params (excluding file, api_key,
  // signature, cloud_name, resource_type) joined as `k=v&k=v`, then concatenated
  // with the API secret and hashed with SHA1.
  const signedParams: Record<string, string> = { timestamp };
  if (folder) signedParams.folder = folder;
  const stringToSign = Object.keys(signedParams)
    .sort()
    .map((k) => `${k}=${signedParams[k]}`)
    .join("&");
  const signature = crypto
    .createHash("sha1")
    .update(stringToSign + apiSecret)
    .digest("hex");

  const upload = new FormData();
  upload.append("file", file);
  upload.append("api_key", apiKey);
  upload.append("timestamp", timestamp);
  upload.append("signature", signature);
  if (folder) upload.append("folder", folder);

  let cloudRes: Response;
  try {
    cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: "POST", body: upload },
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Cloudinary nicht erreichbar" },
      { status: 502 },
    );
  }

  if (!cloudRes.ok) {
    const text = await cloudRes.text();
    return NextResponse.json(
      { error: `Cloudinary ${cloudRes.status}: ${text.slice(0, 300)}` },
      { status: 502 },
    );
  }

  const json = (await cloudRes.json()) as {
    secure_url?: string;
    resource_type?: string;
    format?: string;
    width?: number;
    height?: number;
  };
  if (!json.secure_url) {
    return NextResponse.json(
      { error: "Cloudinary lieferte kein secure_url" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    url: json.secure_url,
    resourceType: json.resource_type,
    format: json.format,
    width: json.width,
    height: json.height,
  });
}
