import { murray } from "./murray75_100";

import "@/app/styles/backgroundAnimation.css";

const points = murray;

export default function MurrayCurveBackground() {
  const pathData = points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command}${point[0]} ${point[1]}`;
    })
    .join(" ");
  const maxX = Math.max(...points.map(p => p[0]));
  const maxY = Math.max(...points.map(p => p[1]));
  console.log('Max X:', maxX, 'Max Y:', maxY);
  console.log("Length of points:", points.length);

  return (
    <div className="fixed mt-4 h-[100vh] w-[100vw] inset-0 -z-10 overflow-hidden">
      <svg
        viewBox="-1 -1 86 26"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full "
      >
        <path className="murraybg" d={pathData} />
      </svg>
    </div>
  );
}

