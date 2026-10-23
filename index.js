import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

// temporarily hardcode recipe collection
const recipes = {
    "roasted red pepper soup": {
        ingredients: ["red peppers", "garlic", "onion"],
        steps: ["Roast the peppers", "Blend the ingredients"]
    },
    "chocolate chip cookies": {
        ingredients: ["flour", "sugar", "chocolate chips"],
        steps: ["Mix the ingredients", "Bake in the oven"]
    },
    "steak and potatoes": {
        ingredients: ["steak", "potatoes", "salt", "pepper"],
        steps: ["Season the steak", "Cook the steak to desired doneness", "Boil or roast the potatoes"]
    }

};

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

serveStdio(createServer);

console.error("KimCooks MCP server is running!");