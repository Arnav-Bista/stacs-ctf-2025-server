import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stmt = db.prepare("SELECT name, points, found_at FROM teams JOIN team_flags ON teams.id = team_flags.team_id JOIN flags ON team_flags.flag_id = flags.id ORDER BY name ASC, found_at ASC");
    const rows = stmt.all();
    return NextResponse.json(rows);
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    );
  }
}
