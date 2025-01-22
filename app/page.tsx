import AnimatedStacsLogo from "./animatedStacsLogo";
import db from "./lib/db";



export default function Home() {
  const d = db;
  return (
    <div>
      <div>STACS CTF 2025</div>
      <div>By STACS DEVs</div>
    </div>
  );
}
