export function trackGoal(goal: string) {
  const ym = (window as Window & { ym?: (id: number, method: string, goal: string) => void }).ym;
  if (typeof ym === "function") ym(113264514, "reachGoal", goal);
}
