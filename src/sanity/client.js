import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: 'va67y5aa', // Replace with your actual project ID
  dataset: 'production',
  useCdn: true, // Use CDN for faster, cached results
  apiVersion: '2024-01-01', // Use current date for API version
  token: process.env.REACT_APP_SANITY_TOKEN,
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source) {
  return builder.image(source);
}
