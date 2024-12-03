export function calculateHouseCleaningPrice(
  area: number,
  totalFreelancers: number,
  duration: number,
  totalWorkDays: number,
): number {
  const R = 75000;
  const H = duration * totalWorkDays;
  const N = totalFreelancers;
  const A = area <= 60 ? 1 : area <= 100 ? 1.1 : 1.2;
  return R * H * N * A;
}
