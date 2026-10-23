import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import { readFile } from "node:fs/promises";

// helper function to load,retrieve data
async function loadRecipes() {
    const file = await readFile(
        new URL("./recipes.json", import.meta.url),
        "utf8"
    );

    return JSON.parse(file);
}

// create and configure the server (server definition)
function createServer() {
    const server = new McpServer({
        name: "kimcooks-mcp",
        version: "1.0.0"
    });

    // register tools 
    server.registerTool(
        "get_recipe",
        {
            description: "Retrieve a recipe from my recipe book",
            inputSchema: z.object({
                recipeName: z.string()
            })
        },
        async ({ recipeName }) => {
            console.error(`[MCP] get_recipe called with: ${recipeName}`); // add to test if agent is calling the tool
            const normalizedName = recipeName.toLowerCase().trim();

            // Check if the recipe exists
            if (recipes[normalizedName]) {
                return {
                    content: [
                        {
                            type: "text",
                            // show recipe details on seperate lines
                            text: `Found recipe: ${recipeName}\n\nIngredients:\n${recipes[normalizedName].ingredients.join(", ")}\n\nSteps:\n${recipes[normalizedName].steps.join(", ")}`
                        }
                    ]
                };
            }
            else {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Recipe not found: ${recipeName} `
                        }
                    ]
                };
            }
        }
    );

    server.registerTool("list_recipes", {
        description: "List all available recipes in KimCooks",
        inputSchema: {}
    }, async () => {
        // Return available recipes
        return {
            content: [
                {
                    type: "text",
                    text: "Available recipes:\n" + Object.keys(recipes).join("\n") // generating the list from your existing recipes object, rather than maintaining a second hardcoded list
                }
            ]
        };
    });

    return server;
}

// load recipe data before starting the server
const recipes = await loadRecipes();

// call the server 
serveStdio(createServer());