import { ConvexReactClient } from "convex/react";
import { api } from "./_generated/api";

// Create a Convex client
// For React apps, environment variables must be prefixed with REACT_APP_
const convexUrl = process.env.REACT_APP_CONVEX_URL;

if (!convexUrl) {
  console.warn('REACT_APP_CONVEX_URL is not defined. Please set it in your .env file.');
}

export const convex = new ConvexReactClient(convexUrl || "https://cool-parrot-987.convex.cloud");
export { api };
