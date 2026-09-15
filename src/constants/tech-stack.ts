export interface TechItem {
  name: string;
  category: string;
}

export const techStack: TechItem[] = [
  { name: "OpenAI", category: "Models" },
  { name: "Anthropic", category: "Models" },
  { name: "Meta Llama", category: "Models" },
  { name: "Mistral", category: "Models" },
  { name: "LangChain", category: "Orchestration" },
  { name: "LangGraph", category: "Orchestration" },
  { name: "Pinecone", category: "Vector Store" },
  { name: "Weaviate", category: "Vector Store" },
  { name: "PostgreSQL", category: "Data" },
  { name: "Snowflake", category: "Data" },
  { name: "AWS", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "Google Cloud", category: "Cloud" },
  { name: "Kubernetes", category: "Infrastructure" },
  { name: "Docker", category: "Infrastructure" },
  { name: "Next.js", category: "Application" },
  { name: "PyTorch", category: "ML" },
  { name: "Ray", category: "ML" },
];
