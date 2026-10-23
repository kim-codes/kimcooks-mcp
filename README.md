# KimCooks MCP 🍳

my recipe book, but now with an MCP server

just finding an excuse to experiment with the Model Context Protocol (MCP) and how to give an AI assistant a way to rummage through my recipebook  

## the idea

started building a digital recipe book and this MCP would make those recipes accessible to an AI assistant

ask for a recipe --> get the ingredients and steps --> no digging through pages to find what I need.

## built with

javascript · node js · Model Context Protocol (MCP)

just a little experiment in understanding how MCP works, one recipe at a time

## getting started 

pre-reqs: Node.js, VS Code with GitHub Copilot enabled

1. Clone the repo and open the project in VS Code 
2. Open a terminal in VS Code (_Terminal → New Terminal_) and run `npm install` to install dependencies 
3. The `.vscode/mcp.json` file configures VS Code to launch the KimCooks MCP server
4. To run it, open the Command Palette (`Ctrl + Shift + P`), and select `MCP: List Servers`, and `Start kimcooks`. VS Code will launch the server for you.
5. Open Copilot Chat in Agent mode (the little chat bubble at the top of VS Code) and ask the following qs one at a time:

    >What recipes do you have?
    >Can you give me the recipe for chocolate chip cookies?
    >What can I cook tonight?

