// The three side projects, as drawn in ProjectRowV4 on the Doop canvas.
// `diagram` picks which hard-problem drawing sits under the screenshot.

export type Diagram = "book" | "ladder" | "partition";

export type Project = {
  id: string;
  year: string;
  title: string;
  what: string;
  hard: string;
  stack: string;
  side: "left" | "right";
  diagram: Diagram;
  live: string;
  code: string;
  shot: { src: string; alt: string; width: number; height: number };
};

export const projects: Project[] = [
  {
    id: "vroom",
    year: "2026",
    title: "Vroom",
    what: "A self-drive car rental site for Bangalore.",
    hard: "A search only shows cars that are free for the dates asked, and the booking that follows is one atomic insert, so nobody can take the car in between. A language model turns the customer's sentence into filters, and the database does the searching.",
    stack:
      "Next.js · Drizzle · Neon Postgres · Upstash Redis · NextAuth · Razorpay · Vercel AI SDK with Groq · Mapbox · Sentry",
    side: "left",
    diagram: "book",
    live: "https://vroom-cars.vercel.app",
    code: "https://github.com/Ken-1219/vroom",
    shot: {
      src: "/projects/vroom.png",
      alt: "The Vroom search page, listing self-drive cars available in Bangalore with their prices and dates",
      width: 1353,
      height: 818,
    },
  },
  {
    id: "descent",
    year: "2026",
    title: "Descent",
    what: "A daily dungeon posted to a subreddit, where everyone plays the same floor once a day.",
    hard: "Players design tomorrow's floor, and every floor still has to be winnable. A six-step ladder gives up the game's own choices before it touches a player's trap, and a bot plays each candidate floor hundreds of times to prove it.",
    stack: "TypeScript · Devvit Web · Phaser · Hono · Vite · Vitest",
    side: "right",
    diagram: "ladder",
    live: "https://www.reddit.com/r/DescentDaily/comments/1y463th/descent_todays_floor/",
    code: "https://github.com/Ken-1219/descent",
    shot: {
      src: "/projects/descent.png",
      alt: "The Descent dungeon floor rendered in a Reddit post, with the player's character and the day's traps",
      width: 1444,
      height: 902,
    },
  },
  {
    id: "contexto",
    year: "2026",
    title: "Contexto",
    what: "A word game where you find a secret word by semantic similarity, alone or against one other player.",
    hard: "A whole multiplayer game fits in one DynamoDB partition. I mapped seven access patterns before choosing the keys, so a game's metadata, players and guesses read in a single query.",
    stack: "Next.js · DynamoDB · HuggingFace embeddings · Bun",
    side: "left",
    diagram: "partition",
    live: "https://multiplayer-contexto.vercel.app/",
    code: "https://github.com/Ken-1219/multiplayer-contexto",
    shot: {
      src: "/projects/contexto.png",
      alt: "The Contexto game board, showing guessed words ranked by how close they are to the secret word",
      width: 1353,
      height: 818,
    },
  },
];

// The hard-problem diagrams. Each is a short, literal reading of the repo —
// the text is the drawing, so it stays legible at any width and in both themes.

export const diagrams = {
  book: {
    caption: "The hard problem",
    rows: [
      { kind: "step", n: "1", text: "search(city, dates)" },
      {
        kind: "sql",
        lines: [
          "SELECT … FROM vehicles",
          "WHERE NOT EXISTS (overlapping bookings)",
          "AND NOT EXISTS (availability blocks)",
          "AND earth_box(…) @> ll_to_earth(lat, lng)",
        ],
      },
      {
        kind: "note",
        text: "only cars that are free, distance ranked in Postgres",
      },
      { kind: "step", n: "2", text: "book(vehicleId, dates)" },
      {
        kind: "sql",
        lines: [
          "INSERT INTO bookings … SELECT …",
          "WHERE NOT EXISTS (overlapping booking)",
        ],
      },
      {
        kind: "note",
        text: "one statement, so nothing fits between the check and the write",
      },
    ],
  },
  ladder: {
    caption: "The hard problem",
    rows: [
      { kind: "rung", label: "full", text: "every modifier the crowd produced" },
      {
        kind: "rung",
        label: "no crowd",
        text: "drops the game's own zone weights and top killer",
      },
      {
        kind: "rung",
        label: "reroll",
        text: "the players' choices on a new base seed",
      },
      {
        kind: "rung",
        label: "moved traps",
        text: "each trap shifts inside the zone its owner picked",
      },
      {
        kind: "rung",
        label: "fewer traps",
        text: "drop the one whose absence helps most, repeat",
      },
      { kind: "rung", label: "plain", text: "last resort" },
      {
        kind: "note",
        text: "a step is accepted when winPct() lands inside the band",
      },
    ],
  },
  partition: {
    caption: "The hard problem",
    rows: [
      { kind: "kv", k: "PK", v: "SK", head: true },
      { kind: "kv", k: "GAME#<gameId>", v: "METADATA" },
      { kind: "kv", k: "GAME#<gameId>", v: "PLAYER#<playerId>" },
      { kind: "kv", k: "GAME#<gameId>", v: "GUESS#<ts>#<id>" },
      { kind: "kv", k: "PLAYER#<playerId>", v: "PROFILE" },
      {
        kind: "note",
        text: "one game is one partition, so metadata, players and guesses read together",
      },
      { kind: "kv", k: "GSI1", v: "roomCode → game", head: true },
      { kind: "kv", k: "GSI2", v: "status → lobby", head: true },
    ],
  },
} as const;
