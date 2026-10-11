import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

// temporarily hardcode recipe collection
const recipes = {
    "roasted red pepper soup": {
        ingredients: ["red peppers", "garlic", "onion"],
        steps: ["Roast the peppers", "Blend the ingredients"]
    }
};

function createServer() {
    const server = new McpServer({
        name: "kimcooks-mcp",
        version: "1.0.0"
    });

    server.registerTool(
        "get_recipe",
        {
            description: "Retrieve a recipe from my recipe book",
            inputSchema: z.object({ // update, SDK v2 expects input wrapped in a Zod object schema
                recipeName: z.string()
            })
        },
        async ({ recipeName }) => {
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

    return server;
}

serveStdio(createServer);

console.error("KimCooks MCP server is running!");