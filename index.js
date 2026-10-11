import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { z } from "zod"; // make to to import zod for input validation

function createServer() {
    const server = new McpServer({
        name: "kimcooks-mcp",
        version: "1.0.0"
    });

    server.registerTool(
        "get_recipe", // tool name 
        {
            description: "Retrieve a recipe from my recipe book",
            inputSchema: { // we want to accept a recipe name as input (string)
                recipeName: z.string()
            }
        },
        async ({ recipeName }) => {  
            return {
                content: [
                    {
                        type: "text",
                        text: `Found recipe: ${recipeName}` // return the input
                    }
                ]
            };
        }
    );

    return server;
}

serveStdio(createServer);

console.error("KimCooks MCP server is running!");