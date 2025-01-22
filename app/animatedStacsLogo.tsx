
// School of CS has the Murray Polygon Space Filling Curve 
// Written by the Univerity of St Andrews CS Goat: Jack Cole (himself)
// But bro wrote the program in 87 (boomer), no comments and single letter variables :(
// https://info.cs.st-andrews.ac.uk/student-handbook/school/jack-cole/murray-polygon.html 
//
// Im just going to try and look at it to replicate it because I dont understand the algorithm 🗿

type Point = [number, number];
// Positive goes right and down
const murrayPointsBase = [
  [1, 0], // Right
  [1, 0],
  [0, -1], // Up
  [-1, 0], // Left
  [-1, 0],
  [0, -1], // Up
  [1, 0], // Right
  [1, 0],
  [0, -1], // Up
  [-1, 0], // Left
  [-1, 0],
  [0, -1], // Up
  [1, 0], // Right
  [1, 0],
];

// Through observation
// Down and UP alternate every other pattern
// Except for the ends when it goes all the way up
// Left and Right alternate once it goes all the way up
// Then its a recursive pattern

// Will prepresent state using number 
// Number % (murrayPointsBase.length) ^ Order -> Index of the direction of the given order 
// But that does not tell us which stuff to flip
//
// * [-1, 1] Flip Left and Right
// * [1, -1] Flip Up and Down

export default function AnimatedStacsLogo() {
  // Using a 100 by 100 grid

  // Start at bottom left
  let currentPoint: Point = [0, 100];
  const points: Array<Point> = [currentPoint];

  // 0th index -> Order 1
  // Holds the position of what move to make
  const orders: number[] = [0];
  let flipVertical = false;
  let flipHorizonal = false;
  for (let i = 0; i < 100 * 100; i++) {
    const step = murrayPointsBase[i % murrayPointsBase.length];
    const lastPoint = points[points.length - 1];

    const newPoint: Point = [
      lastPoint[0] + step[0] * (flipHorizonal ? -1 : 1),
      lastPoint[1] + step[1] * (flipVertical ? -1 : 1),
    ];

    points.push(newPoint);

    let currentOrder = 0;
    let higherOrderPoint = null;
    while (orders[currentOrder] % murrayPointsBase.length === 0) {
      orders[currentOrder] += 1 % murrayPointsBase.length;
      if (orders[currentOrder] === 0) {
        if (orders.length <= currentOrder + 1) {
          orders.push(1);
        } else {
          orders[currentOrder + 1] += 1;
        }
      }
      const higherOrderMove = murrayPointsBase[orders[currentOrder] % murrayPointsBase.length];
      if (currentOrder % 3 !== 0) {
        flipVertical = !flipVertical;
      } else {
        flipHorizonal = !flipHorizonal;
      }
      higherOrderPoint = [newPoint[0] + higherOrderMove[0], newPoint[1] + higherOrderMove[1]];
      currentOrder += 1;
    }


    // if ((i + 1) % murrayPointsBase.length === 0) {
    //   const higherOrderMove = murrayPointsBase[orders[0] % murrayPointsBase.length];
    //   points.push([newPoint[0] + higherOrderMove[0], newPoint[1] + higherOrderMove[1]]);
    //   orders[0] += 1;
    //   if (orders[0] % 3 === 0) {
    //     flipHorizonal = !flipHorizonal;
    //   }
    // }

  }

  // Draw lines
  return (
    <svg
      viewBox="0 0 100 100"
    >
      {
        points.map((point, index) => {
          const nextPoint = points[index + 1];
          if (nextPoint) {
            return (
              <line
                key={index}
                x1={point[0]}
                y1={point[1]}
                x2={nextPoint[0]}
                y2={nextPoint[1]}
                stroke="black"
                strokeWidth="0.1"
              />
            );
          }
        })
      }
    </svg>
  );
}
