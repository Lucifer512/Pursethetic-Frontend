import { cookies } from "next/headers";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import type { NextRequest } from "next/server";

function requireAuth(session: string | undefined) {
  return session && session === process.env.ADMIN_SESSION_TOKEN;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (!requireAuth(cookieStore.get("admin_session")?.value)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  if (!isSupabaseConfigured()) {
    return Response.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const sb = createAdminClient();
  const { data, error } = await sb
    .from("categories")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (!requireAuth(cookieStore.get("admin_session")?.value)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return Response.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const sb = createAdminClient();
  const { error } = await sb.from("categories").delete().eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
