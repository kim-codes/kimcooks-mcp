import inquirer from "inquirer";
import { GoogleGenAI } from "@google/genai";
import { loadEnvFile } from "node:process";


let recipe;
// load API key from .env
loadEnvFile();

// initialize connection to gemini
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// accept recipe input from user 
const { recipeInput } = await inquirer.prompt({
    type: "editor",
    name: "recipeInput",
    message: "Paste your recipe:"
});

recipe = recipeInput;

console.log("Sending recipe to Gemini...");

// send the recipe to an LLM 
// Extract a recipe from the user's notes. Identify the recipe name, ingredients, and steps. Do not invent missing quantities or instructions.
// Flag important missing details for clarification
try {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: recipeInput,
        config: {
            systemInstruction: "Extract ingredients and steps from this recipe."
        }
    });


    // output the response from the LLM
    console.log("LLM response " + response.text);

} catch (error) {
    if (error.status === 503) {
        console.log("503, Gemini is busy right now. Please try again later.");
    } else {
        console.error("Gemini request failed:", error.message);
    }
}


// ask follow up question if anything is missing 
// accept user input and store it (what if something is still missing)

// ask user if they want to save the recipe 
const { toSave } = await inquirer.prompt({
    type: "confirm",
    name: "toSave",
    message: "Do you want to save (y/n):",
    default: false
});

if (toSave) {
    console.log("Saved!")
}
else {
    console.log("Not saved.")
}

// save to recipe.json file

// output final msg 
