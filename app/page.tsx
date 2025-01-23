import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold">STACS CTF 2025</div>
        <div className="mt-2">By STACS DEVs</div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <Link href="/teams">
          <Button>Register Team</Button>
        </Link>
        <Link href="/submit">
          <Button>Submit Flag</Button>
        </Link>
        <Link href="/leaderboard">
          <Button>Leaderboard</Button>
        </Link>
      </div>
    </div>
  );
}
