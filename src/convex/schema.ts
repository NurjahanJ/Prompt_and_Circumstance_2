import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Convex database schema definition
 * This defines the structure of our database tables
 */
export default defineSchema({
  // Define a table for storing prompt interactions
  promptInteractions: defineTable({
    // Anonymous user ID (format: anon-abc123)
    userId: v.string(),
    
    // The user's input text
    prompt: v.string(),
    
    // The AI's response text
    response: v.string(),
    
    // Human-readable timestamp (e.g., "June 12, 2025, 3:24 PM")
    timestamp: v.string(),
  }),
});
