import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Contentful webhook target — fires on publish/unpublish/delete of a
// Realizacja entry so new content shows up without waiting for the
// route's timed revalidation window.
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.CONTENTFUL_REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "Nieprawidłowy sekret." }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
