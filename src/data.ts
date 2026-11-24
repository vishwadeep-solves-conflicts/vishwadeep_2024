export const profile = {
  name: "Vishwadeep Kushwaha",
  role: "Senior Software Engineer",
  location: "Bengaluru, India",
  email: "mailvishwadeephere@gmail.com",
  linkedin: "https://www.linkedin.com/in/vish-kushwaha/",
  github: "https://github.com/vishwadeep-solves-conflicts",
};

export const highlights = [
  { value: "150k+", label: "members served by the BullMQ scheduler I rebuilt" },
  { value: "514 → 1.3 ms", label: "schedule lookups after Postgres partial indexes" },
  { value: "2,333", label: "commits since March 2024, 1,476 merged PRs" },
  { value: "704 → 185 s", label: "React test suite run time" },
];

export const commitsByYear = [
  { year: "2024", count: 531 },
  { year: "2025", count: 831 },
  { year: "2026", count: 971 },
];

export type Job = {
  role: string;
  company: string;
  place?: string;
  dates: string;
  summary?: string;
  points: string[];
  tech: string[];
};

export const jobs: Job[] = [
  {
    role: "Senior Software Engineer",
    company: "SleekSky",
    dates: "Aug 2022 – now",
    summary: "US healthcare platform for at-home lab testing and health-plan programs: Node.js/Express API, React web app, PostgreSQL.",
    points: [
      "Rebuilt the job scheduler on BullMQ and Redis for 150k+ members; load-tested it in 10k-row bursts.",
      "Partial indexes and materialized views in Postgres; async processing for 50k-row eligibility uploads.",
      "Lab-ordering integrations, two rounds of pen-test fixes and TCPA-compliant member messaging.",
      "2022–23: client backends with NestJS, Azure and Keycloak.",
    ],
    tech: ["Node.js", "Express", "PostgreSQL", "BullMQ", "Redis", "React", "AWS S3"],
  },
  {
    role: "Web Developer",
    company: "FlockAlong",
    dates: "Dec 2020 – Aug 2022",
    points: [
      "Built the Gatsby front-end where travellers create, join and manage trips.",
      "Algolia search with automated data sync, Auth0 sign-in, and parts of the C# and Node backend.",
    ],
    tech: ["Gatsby", "GraphQL", "C#", "Auth0", "Algolia"],
  },
  {
    role: "Operations Manager",
    company: "KhaoBao",
    place: "Ludhiana",
    dates: "Aug 2018 – Nov 2019",
    points: ["Built the customer and delivery-partner Android apps, and ran operations through 40,000+ orders."],
    tech: ["Java", "Android", "Firebase"],
  },
];

export type Project = {
  name: string;
  tag: string;
  desc: string;
  url?: string;
  code?: string;
  /** screenshot shown on the /apps/ hub */
  image?: string;
};

export const projects: Project[] = [
  {
    name: "Rubix",
    tag: "Client · NestJS · Azure",
    desc: "Placement platform where US hospitals publish availability for schools and students. Involved in its architecture and APIs from the ground up.",
  },
  {
    name: "Visual JSON Editor",
    tag: "Client · React · NestJS",
    desc: "A tailored editor that lets a client manage 10k+ JSON files and 1M+ lines of configuration.",
  },
  {
    name: "FlockAlong",
    tag: "Product · Gatsby · Algolia",
    desc: "Trips created by travel leaders, with a multi-step builder for routes, images, slots and pricing.",
    url: "https://flockalong.com",
  },
  {
    name: "India Commerce",
    tag: "Side project · React · Python",
    desc: "Scrapes and charts India's trade with every partner country over time.",
    code: "https://github.com/vishwadeep-solves-conflicts/india-commerce",
  },
  {
    name: "KhaoBao",
    tag: "Startup · Android · Firebase",
    desc: "Food delivery apps for customers and delivery partners, from ordering to live tracking.",
    code: "https://github.com/vishwadeep-solves-conflicts/KhaoBao",
  },
  {
    name: "GupShup",
    tag: "Side project · MERN",
    desc: "One of my first full-stack projects: a social site with everything but real-time chat.",
    code: "https://github.com/vishwadeep-solves-conflicts/gupshup",
  },
];

export const sideProjects: Project[] = [
  {
    name: "Traffic Sandbox",
    tag: "Simulation · Canvas · No dependencies",
    desc: "A traffic simulator in the browser. Draw roads, time signals, add flyovers or import a real OpenStreetMap area, then compare before and after.",
    url: "https://vishwadeep-solves-conflicts.github.io/traffic-sandbox/",
    code: "https://github.com/vishwadeep-solves-conflicts/traffic-sandbox",
    image: "https://raw.githubusercontent.com/vishwadeep-solves-conflicts/traffic-sandbox/main/screenshot.png",
  },
  {
    name: "Private Commit Heatmap",
    tag: "Dev tool · Python · Bash · PowerShell",
    desc: "Shows work from private repos as a GitHub-style heatmap. Only dates and counts leave your repos. The graph above was made with it.",
    url: "https://vishwadeep-solves-conflicts.github.io/private-commit-heatmap/",
    code: "https://github.com/vishwadeep-solves-conflicts/private-commit-heatmap",
    image: "https://raw.githubusercontent.com/vishwadeep-solves-conflicts/private-commit-heatmap/main/screenshot.png",
  },
  {
    name: "India City Livability Index",
    tag: "Data · Interactive ranking",
    desc: "20 Indian cities rated on 17 factors and ranked for four kinds of people. Change the weights and watch the ranking move.",
    url: "https://vishwadeep-solves-conflicts.github.io/india-livability-index/",
    code: "https://github.com/vishwadeep-solves-conflicts/india-livability-index",
    image: "https://raw.githubusercontent.com/vishwadeep-solves-conflicts/india-livability-index/main/screenshot.png",
  },
  {
    name: "The Group Wants to Guess",
    tag: "Party game · Vanilla JS",
    desc: "A living-room quiz for a TV or projector: four rounds, a scoreboard, timers and sounds, with every question editable.",
    url: "https://vishwadeep-solves-conflicts.github.io/group-wants-to-guess/",
    code: "https://github.com/vishwadeep-solves-conflicts/group-wants-to-guess",
    image: "https://raw.githubusercontent.com/vishwadeep-solves-conflicts/group-wants-to-guess/main/screenshot.png",
  },
];

export const skills = [
  { group: "Backend", items: "Node.js, Express, NestJS, Sequelize, BullMQ, C#, REST, GraphQL" },
  { group: "Data", items: "PostgreSQL, Redis, MongoDB, Cosmos DB" },
  { group: "Frontend", items: "React, Vite, TypeScript, TanStack, MUI, Gatsby" },
  { group: "Cloud & testing", items: "AWS S3, Azure, Docker, Jest, Vitest, Cypress" },
];
