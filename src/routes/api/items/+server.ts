import { json } from "@sveltejs/kit";

export function GET() {
  const items = Array(50)
    .fill(0)
    .map((_, i) => ({ text: `Item ${i + 1}`, value: i + 1 }));
  return json(items);
}
