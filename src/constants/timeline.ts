export interface TimelineStep {
  step: string;
  title: string;
  description: string;
}

export const howWeWork: TimelineStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We map your operations, data, and systems to find the highest-leverage AI opportunities — and rule out the ones that aren't worth pursuing yet.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Our team architects the system: model selection, agent design, data pipelines, and integration points, validated against your real constraints.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We ship a production-grade system in focused sprints, with working software in your hands every two weeks — not a slide deck at the end.",
  },
  {
    step: "04",
    title: "Deploy",
    description:
      "Staged rollout into your environment with full observability, security review, and a rollback plan before anything touches production traffic.",
  },
  {
    step: "05",
    title: "Operate & Improve",
    description:
      "We monitor, retrain, and expand the system post-launch, so performance compounds instead of degrading as your business changes.",
  },
];
