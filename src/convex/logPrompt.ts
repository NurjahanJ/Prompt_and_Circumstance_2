import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Mutation function to log user prompts and AI responses
 * This function stores the interaction data in the Convex database
 */
export const logPromptInteraction = mutation({
  // Define the expected arguments with validation
  args: {
    userId: v.string(),     // Anonymous user ID from localStorage
    prompt: v.string(),     // The user's input text
    response: v.string(),   // The AI's response text
    timestamp: v.string(),  // Human-readable timestamp
  },
  
  // Function implementation
  handler: async (ctx: any, args: { userId: string; prompt: string; response: string; timestamp: string }) => {
    console.log("Convex: Received prompt interaction", { 
      userId: args.userId,
      promptLength: args.prompt.length,
      responseLength: args.response.length,
      timestamp: args.timestamp 
    });
    
    try {
      // Insert the prompt interaction into the database
      const id = await ctx.db.insert("promptInteractions", {
        userId: args.userId,
        prompt: args.prompt,
        response: args.response,
        timestamp: args.timestamp,
      });
      
      console.log("Convex: Successfully inserted prompt interaction with ID:", id);
      
      // Return the ID of the newly created record
      return id;
    } catch (error) {
      console.error("Convex: Error inserting prompt interaction:", error);
      throw error; // Re-throw to ensure the client knows there was an error
    }
  },
});
