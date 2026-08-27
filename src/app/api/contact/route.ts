import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "RN Serwis Elektroniki <kontakt@rnserwiselektroniki.pl>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "serwis.elektroniki112@gmail.com";
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY nie jest ustawiony.");
    return NextResponse.json(
      { error: "Formularz jest chwilowo niedostępny. Zadzwoń do nas bezpośrednio." },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const device = formData.get("device")?.toString().trim() ?? "";
  const desc = formData.get("desc")?.toString().trim() ?? "";
  const consent = formData.get("consent") === "true";
  const file = formData.get("file");

  if (!name || !phone || !email || !desc || !consent) {
    return NextResponse.json(
      { error: "Uzupełnij wymagane pola formularza." },
      { status: 400 },
    );
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Załączony plik jest za duży (limit 8 MB)." },
        { status: 400 },
      );
    }
    attachments.push({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nowe zapytanie o naprawę — ${name}`,
      text: [
        `Imię i nazwisko: ${name}`,
        `Telefon: ${phone}`,
        `E-mail: ${email}`,
        `Rodzaj urządzenia: ${device || "—"}`,
        "",
        "Opis usterki:",
        desc,
      ].join("\n"),
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Nie udało się wysłać zapytania. Spróbuj ponownie później." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać zapytania. Spróbuj ponownie później." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
