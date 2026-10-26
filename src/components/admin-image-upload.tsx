"use client";

import { useState } from "react";

export function AdminImageUpload() {
  const [url, setUrl] = useState(""); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false);
  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    const form = new FormData(); form.set("file", file); setLoading(true); setMessage("");
    try { const response = await fetch("/api/admin/uploads", { method: "POST", body: form }); const result = await response.json() as { url?: string; error?: string }; if (!response.ok || !result.url) throw new Error(result.error ?? "Upload failed."); setUrl(result.url); setMessage("Image uploaded. Copy its URL into the product image field."); }
    catch (cause) { setMessage(cause instanceof Error ? cause.message : "Upload failed."); }
    finally { setLoading(false); event.target.value = ""; }
  }
  return <section className="admin-create"><h2>Upload a product image</h2><p>JPEG, PNG or WebP, up to 5 MB. Upload requires a configured Vercel Blob token.</p><label className="upload-control">Choose image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void upload(event)} disabled={loading} /></label>{url && <div className="uploaded-url"><input aria-label="Uploaded image URL" readOnly value={url} /><button className="button button-outline" type="button" onClick={() => void navigator.clipboard.writeText(url)}>Copy URL</button></div>}<p className="form-note" aria-live="polite">{loading ? "Uploading image..." : message}</p></section>;
}
