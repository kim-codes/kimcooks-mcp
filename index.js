// first things first establish a connection with an MCP client
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

// function that builds and returns the server.
function createServer() {
    const server = new McpServer({
        name: "kimcooks-mcp",
        version: "1.0.0"
    });

    return server;
}

// starts listening for communication from an MCP client
serveStdio(createServer);

console.error("KimCooks MCP server is running!");