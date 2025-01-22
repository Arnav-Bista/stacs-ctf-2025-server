import db from "@/app/lib/db";
import Team from "@/app/lib/types/team";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const teamName = request.nextUrl.searchParams.get("teamName");
  if (!teamName) {
    return NextResponse.json(
      { error: "team name not supplied." },
      { status: 400 }
    );
  }

  // Getting Team ID
  const team = db.prepare("SELECT * FROM teams WHERE name = ?");
  const teamResult = team.get(teamName) as Partial<Team>;
  if (!teamResult.id) {
    return NextResponse.json(
      { error: "team not found." },
      { status: 404 }
    );
  }

  const flags = db.prepare(
    "SELECT flag, points, found_at FROM team_flags INNER JOIN flags on team_flags.flag_id = flags.id WHERE team_id = ?"
  );
  const result = flags.all(teamResult.id);
  console.log(result);


  return NextResponse.json(
    result
  );

}
