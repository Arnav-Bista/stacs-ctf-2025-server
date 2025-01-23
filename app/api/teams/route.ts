import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const teams = db.prepare("SELECT * FROM teams");
    const result = teams.all();
    return NextResponse.json(
      result
    );
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    )
  }
}

export interface CreateTeamsInput {
  name: string;
}

export async function POST(request: NextRequest) {
  const data = await request.json() as Partial<CreateTeamsInput>;
  if (!data.name) {
    return NextResponse.json(
      { error: "Name is required, silly!" },
      { status: 400 }
    );
  }
  try {
    if (await getTeamId(data.name)) {
      return NextResponse.json(
        { error: "Team already exsist." },
        { status: 409 }
      );
    }
    const insert = db.prepare("INSERT INTO teams (name) VALUES (?)");
    const result = insert.run(data.name);
    return NextResponse.json(
      { id: result.lastInsertRowid }
    );
  }
  catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 500 }
    )
  }

}

/*
* Returns the id if the team name exists
* Otherwise returns null
*/
export async function getTeamId(name: string): Promise<number | null> {
  const teamStmt = db.prepare("SELECT id FROM teams WHERE name = ?");
  const teamId: any = teamStmt.get(name);
  if (!teamId || !teamId.id) {
    return null;
  }

  return teamId.id;
}
