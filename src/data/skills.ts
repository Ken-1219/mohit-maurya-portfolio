// The skill wall. Six categories; each row begins with its label cell and is
// padded to a full row of seven on desktop. `now` marks what Mohit works in
// today (darker ink); `where` is revealed on hover, focus or tap. A skill with
// no `where` keeps its name instead of swapping to nothing.

import type { IconName } from "./icons";

export type Skill = {
  name: string;
  /** Inline logo, or a serif monogram when no mark exists. */
  icon?: IconName;
  monogram?: string;
  /** Wide marks sit on a 80px box instead of 40px. */
  wide?: boolean;
  now?: boolean;
  where?: string;
};

export type SkillCategory = { id: string; label: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: "lang",
    label: "Languages",
    skills: [
      { name: "Java", icon: "java", now: true, where: "Loylty Rewardz" },
      { name: "Go", icon: "go", wide: true, now: true, where: "Loylty Rewardz" },
      { name: "Python", icon: "python", where: "ContraVault AI" },
      {
        name: "TypeScript",
        icon: "typescript",
        now: true,
        where: "Loylty · ContraVault · Side projects",
      },
      { name: "JavaScript", icon: "javascript" },
      { name: "C++", icon: "cplusplus" },
    ],
  },
  {
    id: "fe",
    label: "Frontend",
    skills: [
      {
        name: "React",
        icon: "react",
        now: true,
        where: "Loylty · ContraVault · Vroom",
      },
      {
        name: "Next.js",
        icon: "nextdotjs",
        now: true,
        where: "Loylty · ContraVault · Yirifi",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwindcss",
        wide: true,
        where: "Yirifi.ai · Contexto",
      },
      { name: "Astro", icon: "astro" },
      { name: "Framer Motion", icon: "framer" },
      { name: "Socket.IO", icon: "socketdotio" },
    ],
  },
  {
    id: "be",
    label: "Backend",
    skills: [
      {
        name: "Spring Boot",
        icon: "springboot",
        now: true,
        where: "Loylty Rewardz",
      },
      { name: "FastAPI", icon: "fastapi", where: "ContraVault AI" },
      { name: "Node.js", icon: "nodedotjs", where: "Yirifi.ai" },
      { name: "Express", icon: "express", wide: true, where: "Yirifi.ai" },
      { name: "Flask", icon: "flask" },
      { name: "GraphQL", icon: "graphql", where: "Contexto" },
    ],
  },
  {
    id: "da",
    label: "Data and AI",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", where: "Vroom" },
      { name: "DynamoDB", monogram: "Dy", where: "Contexto" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql", wide: true },
      { name: "Redis", icon: "redis", where: "Vroom" },
      { name: "Hugging Face", icon: "huggingface", where: "Contexto" },
    ],
  },
  {
    id: "ms",
    label: "Messaging and search",
    skills: [
      { name: "Kafka", icon: "apachekafka", now: true, where: "Loylty Rewardz" },
      { name: "RabbitMQ", icon: "rabbitmq", now: true, where: "Loylty Rewardz" },
      {
        name: "Elasticsearch",
        icon: "elasticsearch",
        now: true,
        where: "Loylty Rewardz",
      },
      {
        name: "OpenSearch",
        icon: "opensearch",
        now: true,
        where: "Loylty Rewardz",
      },
    ],
  },
  {
    id: "cl",
    label: "Cloud and delivery",
    skills: [
      {
        name: "AWS",
        icon: "aws",
        wide: true,
        now: true,
        where: "ContraVault · Loylty",
      },
      { name: "Docker", icon: "docker", wide: true, where: "Vroom" },
      {
        name: "Kubernetes",
        icon: "kubernetes",
        now: true,
        where: "Loylty Rewardz",
      },
      { name: "Argo CD", icon: "argo", now: true, where: "Loylty Rewardz" },
      { name: "CircleCI", icon: "circleci", now: true, where: "Loylty Rewardz" },
      { name: "GitHub", icon: "github", now: true, where: "Loylty Rewardz" },
    ],
  },
];

export const skillNotes = {
  legend: "Darker marks are what I work in today.",
  tapLegend:
    "Darker marks are what I work in today. Tap a cell to see where I used it.",
  lines: [
    {
      lead: "Inside AWS",
      rest: "ECS · Lambda · Step Functions · AppSync · S3 · IAM · CloudWatch · EC2",
    },
    {
      lead: "Also",
      rest: "REST and GraphQL API design · NLP, word embeddings and semantic similarity",
    },
  ],
  more: { label: "More on GitHub →", href: "https://github.com/Ken-1219" },
};
