import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

function createServer() {
    const server = new McpServer({
        name: "kimcooks-mcp",
        version: "1.0.0"
    });

    // register tool after creating the server and before returning it
    server.registerTool(
        "get_recipe", // tool name 
        {
            description: "Retrieve a recipe from my recipe book" // config 
        },
        async () => { // async is what the tool does 
            return {
                content: [ // info returned by the tool
                    {
                        type: "text",
                        text: "Roasted red pepper soup" // hardcoded for now
                    }
                ]
            };
        }
    );

    return server;
}

serveStdio(createServer);

console.error("KimCooks MCP server is running!");