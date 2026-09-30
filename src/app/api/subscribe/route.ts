import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roastId, bagSize, frequency, grind, shipDay } = body;

    // Validate required fields
    if (!roastId || !bagSize || !frequency || !grind || !shipDay) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: roastId, bagSize, frequency, grind, shipDay" },
        { status: 400 }
      );
    }

    const validSizes = ["8oz", "12oz", "2lb"];
    const validFreqs = ["weekly", "biweekly", "monthly"];
    const validGrinds = ["whole-bean", "coarse", "medium", "fine", "espresso"];
    const validDays = ["mon", "wed", "fri"];

    if (!validSizes.includes(bagSize)) return NextResponse.json({ ok: false, error: "Invalid bagSize" }, { status: 400 });
    if (!validFreqs.includes(frequency)) return NextResponse.json({ ok: false, error: "Invalid frequency" }, { status: 400 });
    if (!validGrinds.includes(grind)) return NextResponse.json({ ok: false, error: "Invalid grind" }, { status: 400 });
    if (!validDays.includes(shipDay)) return NextResponse.json({ ok: false, error: "Invalid shipDay" }, { status: 400 });

    // Deterministic mock — no external API key needed
    const subscription = {
      id: `SUB-${Date.now().toString(36).toUpperCase()}`,
      roastId,
      bagSize,
      frequency,
      grind,
      shipDay,
      status: "active",
      nextShipDate: getNextShipDate(shipDay),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ ok: true, subscription }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

function getNextShipDate(shipDay: string): string {
  const dayMap: Record<string, number> = { mon: 1, wed: 3, fri: 5 };
  const target = dayMap[shipDay] ?? 3;
  const now = new Date();
  const current = now.getDay(); // 0=Sun
  let diff = target - current;
  if (diff <= 0) diff += 7;
  const next = new Date(now);
  next.setDate(now.getDate() + diff);
  return next.toISOString().split("T")[0];
}