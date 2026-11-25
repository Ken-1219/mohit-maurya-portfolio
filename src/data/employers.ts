// Employers. `jobs` drives the three numbered job sections; `experience`
// drives the grouped list in About. Both come from the Doop v4 frames.

export type Job = {
  id: string;
  marker: string;
  name: string;
  role: string;
  dates: string;
  place: string;
  summary: string;
  points: { key: string; body: string; mark?: string }[];
  stack: string;
  inverted: boolean;
};

export const jobs: Job[] = [
  {
    id: "loylty-rewardz",
    marker: "01 · now",
    name: "Loylty Rewardz",
    role: "AI Native Engineer",
    dates: "June 2026 to now",
    place: "Bengaluru",
    summary:
      "I work with the CTO on loyalty programmes for banks. Most of my time goes to system design and architecture decisions, and I build the full-stack services that follow from them.",
    points: [
      {
        key: "System design and architecture",
        body: "Services built to scale across bank programmes.",
      },
      {
        key: "Full-stack delivery",
        body: "Java and Spring Boot, Go, React, Next.js and TypeScript.",
      },
      {
        key: "Security",
        body: "I run VAPT (vulnerability assessment and penetration testing) to find vulnerabilities.",
      },
    ],
    stack:
      "Java · Spring Boot · Go · React · Next.js · TypeScript · AWS · Kubernetes · Kafka · RabbitMQ · Elasticsearch · OpenSearch · Argo CD · CircleCI · GitHub",
    inverted: false,
  },
  {
    id: "contravault-ai",
    marker: "02 · before",
    name: "ContraVault AI",
    role: "Head of Engineering",
    dates: "December 2024 to June 2026",
    place: "Bengaluru",
    summary:
      "I joined as a full stack developer intern and led engineering from July 2025, taking an AI contract-analysis product from 0 to 1. I hired, managed and mentored the full stack engineers who built it with me.",
    points: [
      {
        key: "What the product did",
        body: "Answered questions about contracts of more than 35,000 pages. Vector search found the passages that mattered and a language model answered from the document itself.",
      },
      {
        key: "Numbers from tools",
        body: "Language models are weak at arithmetic, so I added number extraction and rebuilt the feature as an agent that calls tools. The figure comes from the tool; the model only writes the sentence around it.",
      },
      {
        key: "The platform",
        body: "Attribute-based access control across three roles, answers streamed over server-sent events, and the AWS pipeline underneath, with a credit-based free and paid model.",
      },
      {
        key: "Accuracy",
        mark: "43% to 94%",
        body: " on numerical questions, measured across 20+ documents of 2,000 to 35,000 pages.",
      },
    ],
    stack:
      "Python · FastAPI · Next.js · TypeScript · AWS (ECS, Lambda, Step Functions, S3, IAM, CloudWatch)",
    inverted: true,
  },
];

export const yirifi = {
  id: "yirifi-ai",
  marker: "03 · before that",
  name: "Yirifi.ai",
  summary:
    "I wrote backend APIs in Express.js, including the integration mapping for external systems, and built pages and responsive interfaces in Next.js and Tailwind CSS. I also did performance work that brought load times down.",
  // Newest first, as everywhere else on the page: the internship came first
  // (June to August), the developer role followed it.
  meta: [
    "Full Stack Developer",
    "August — November 2024",
    "Full Stack Developer, intern",
    "June — August 2024",
    "Singapore",
  ],
};

export type Experience = {
  org: string;
  when: string;
  place: string;
  roles: { title: string; when: string }[];
};

export const experience: Experience[] = [
  {
    org: "Loylty Rewardz",
    when: "Jun 2026 — present",
    place: "Bengaluru",
    roles: [{ title: "AI Native Engineer", when: "" }],
  },
  {
    org: "ContraVault AI",
    when: "Dec 2024 — Jun 2026",
    place: "Bengaluru",
    roles: [
      { title: "Head of Engineering", when: "Jul 2025 — Jun 2026" },
      {
        title: "Full Stack Developer, intern",
        when: "Dec 2024 — Jun 2025 · remote",
      },
    ],
  },
  {
    org: "Yirifi.ai",
    when: "Jun — Nov 2024",
    place: "Singapore",
    roles: [
      { title: "Full Stack Developer", when: "Aug — Nov 2024" },
      { title: "Full Stack Developer, intern", when: "Jun — Aug 2024" },
    ],
  },
  {
    org: "Netaji Subhas University of Technology",
    when: "2021 — 2025",
    place: "New Delhi",
    roles: [
      {
        title:
          "B.Tech, Electronics and Communications Engineering (Internet of Things)",
        when: "",
      },
    ],
  },
];

export const aboutParagraph =
  "I'm a full stack engineer based in Bengaluru. I started as a developer at Yirifi.ai, then joined ContraVault AI, where I went from intern to leading engineering and took an AI contract-analysis product from zero to production. Today I work at Loylty Rewardz with the CTO on loyalty platforms for banks, where most of my time goes to system design and architecture. I studied Electronics and Communications Engineering at Netaji Subhas University of Technology.";
