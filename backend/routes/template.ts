import { Router } from "express";
import { getTemplate } from "../openai/template";
import { BASE_PROMPT } from "../prompts/base";
import { reactBasePrompt } from "../prompts/react";
import { nodeBasePrompt } from "../prompts/node";



export const templateRouter = Router();

templateRouter.post("/template", async (req, res) => {
    const prompt = req.body.data.prompt;

    console.log(req.body)

    const ans = await getTemplate(prompt);

    const uiPrompt = ans =='react'? reactBasePrompt: nodeBasePrompt;

    if(uiPrompt) {
            res.json([
                {   
                    role: "user",
                    content: BASE_PROMPT,
                },
                 {   
                    role: "user",
                    content:  `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${uiPrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                }, 
                {
                    role: "user",
                    content: prompt
                }
            ]
            )
            return;
        }  
            res.status(403).json({ message: "You cant access this" })
            return;
    

})