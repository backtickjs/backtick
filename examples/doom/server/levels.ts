// The levels, drawn as text: `#` a wall, `P` where you start, `E` an imp, `H`
// a medkit, `A` a box of shells. Edit one and save: the phone plays the new
// map without a rebuild.
const maps = [
  {
    name: "E1M1: Hangar",
    rows: [
      "################",
      "#P.....#.......#",
      "#......#...E...#",
      "#..##..#.......#",
      "#..##......##..#",
      "#......#...##..#",
      "####.###.......#",
      "#......#####.###",
      "#.E....#.......#",
      "#......#..E..H.#",
      "#..A...........#",
      "#......#..###..#",
      "###.####..#E...#",
      "#.........#....#",
      "#.E...H...#..A.#",
      "################",
    ],
  },
  {
    name: "E1M2: Nuclear Plant",
    rows: [
      "####################",
      "#P...#.........#...#",
      "#....#..E...E..#.E.#",
      "#....#..........H..#",
      "#.A..####..##..#...#",
      "#.........#..#.#####",
      "######....#E.#.....#",
      "#....#....#..#..A..#",
      "#.E..#.............#",
      "#....####.####.##..#",
      "#.H..........#..E..#",
      "#....#..E....#.....#",
      "####################",
    ],
  },
];

export type Cell = { x: number; z: number };

/** A level as the phone plays it: each thing at its cell. */
export type Level = {
  name: string;
  width: number;
  depth: number;
  walls: Cell[];
  start: Cell;
  /** Which way you face at the start, in radians: the longest open run. */
  facing: number;
  imps: Cell[];
  medkits: Cell[];
  shells: Cell[];
};

/** Every level, in the order they're played. */
export function readLevels(): Level[] {
  return maps.map(readLevel);
}

export function readLevel({
  name,
  rows,
}: {
  name: string;
  rows: string[];
}): Level {
  const level: Level = {
    name,
    width: rows[0]!.length,
    depth: rows.length,
    walls: [],
    start: { x: 1, z: 1 },
    facing: 0,
    imps: [],
    medkits: [],
    shells: [],
  };
  rows.forEach((row, z) =>
    [...row].forEach((char, x) => {
      if (char === "#") level.walls.push({ x, z });
      if (char === "P") level.start = { x, z };
      if (char === "E") level.imps.push({ x, z });
      if (char === "H") level.medkits.push({ x, z });
      if (char === "A") level.shells.push({ x, z });
    }),
  );
  level.facing = facings
    .map(({ angle, dx, dz }) => {
      let run = 0;
      const { x, z } = level.start;
      while (rows[z + dz * (run + 1)]?.[x + dx * (run + 1)] !== "#") run++;
      return { angle, run };
    })
    .reduce((best, next) => (next.run > best.run ? next : best)).angle;
  return level;
}

// The four ways to face, as the camera turns: an angle of 0 looks toward the
// first row.
const facings = [
  { angle: 0, dx: 0, dz: -1 },
  { angle: Math.PI / 2, dx: -1, dz: 0 },
  { angle: Math.PI, dx: 0, dz: 1 },
  { angle: -Math.PI / 2, dx: 1, dz: 0 },
];
