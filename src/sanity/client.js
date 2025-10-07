import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "nvbey0vw",
  dataset: "studio",
  token:
    "sk3ZwhH5ANe0gNSSjDZF0cWv1ouVUYcAPKY1dpBa0YYlklip9eY58hrAevcUxOgTj63l3DDPI6UCaDwEj8qa4tdhHDqBvFvnvLzHSwd15ANe4ZEcGMfoq52Ug0nFLMqQ8er4l4Ff7aAQFcCQ5Az7wVUTs7283d5pnLFVq1UQ41xZ1OKEC1kq",
  useCdn: false,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
