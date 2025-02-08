import db from "@/app/lib/db";
import { NextResponse } from "next/server";

function getLeaderboardData() {
  const stmt = db.prepare("SELECT name, points, found_at FROM teams JOIN team_flags ON teams.id = team_flags.team_id JOIN flags ON team_flags.flag_id = flags.id ORDER BY name ASC, found_at ASC");
  const rows = stmt.all();
  return rows; }

export async function GET() {
  try {
    const data = getLeaderboardData();
    return NextResponse.json(data);
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    );
  }
}

