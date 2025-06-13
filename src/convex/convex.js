import { ConvexReactClient } from "convex/react";
import { api } from "./_generated/api";

// Create a Convex client
// For React apps, environment variables must be prefixed with REACT_APP_
const convexUrl = process.env.REACT_APP_CONVEX_URL || "https://cool-parrot-987.convex.cloud";

// Log the URL being used to help with debugging
console.log('Initializing Convex client with URL:', convexUrl);

if (!convexUrl) {
  console.error('REACT_APP_CONVEX_URL is not defined. Using fallback URL.');
}

// Create the Convex client with explicit URL
let convexClient;
try {
  convexClient = new ConvexReactClient(convexUrl);
  console.log('Convex client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Convex client:', error);
  // Create a dummy client that will log errors instead of crashing
  convexClient = {
    mutation: async () => {
      console.error('Convex client not properly initialized. Data not logged.');
      return null;
    }
  };
}

// Export the client
export const convex = convexClient;
export { api };
