import { json } from "@sveltejs/kit";

export function GET() {
  const items = [
    {
      options: [
        { text: "Item 1", value: 1 },
        { text: "Item 2", value: 2 },
        { text: "Item 3", value: 3 },
        { text: "Item 4", value: 4 },
        { text: "Item 5", value: 5 },
      ],
      text: "Group 1",
    },
    {
      options: [
        { text: "Item 6", value: 6 },
        { text: "Item 7", value: 7 },
        { text: "Item 8", value: 8 },
        { text: "Item 9", value: 9 },
        { text: "Item 10", value: 10 },
      ],
      text: "Group 2",
    },
  ];
  return json(items);
}
