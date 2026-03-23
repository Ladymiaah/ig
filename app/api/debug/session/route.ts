import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions as any);
    return NextResponse.json({ ok: true, session });
  } catch (err) {
    console.error('Debug session error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
