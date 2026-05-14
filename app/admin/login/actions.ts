"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "deleurant-edit";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin/seo");

  const expected = process.env.EDIT_PASSWORD;
  if (!expected) {
    redirect("/admin/login?error=server");
  }
  if (password !== expected) {
    redirect(`/admin/login?error=wrong&from=${encodeURIComponent(from)}`);
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(from);
}

export async function logout() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  redirect("/admin/login");
}
