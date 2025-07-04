import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import type { Response } from "express";


const ai = new GoogleGenAI({apiKey: process.env?.apiKey});

export async function main(prompt: any, res: Response) {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: [
        {
            role: 'user',
            parts: [{text: prompt[0].content}]
        },
        {
            role: 'user',
            parts: [{text: prompt[1].content}]
        },
        {
            role: 'user',
            parts: [{text: prompt[2].content}]
        }
    ]
  });

 


 // console.log(response.text);

  for await (const chunk of response) {
    res.write(chunk.text);
    console.log(chunk.text);
    console.log("_".repeat(80));
  }
  //return response.text
  res.end();
}


export async function getTemplate(prompt: string) {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Return either node or react based on what do you think this project should be.
         Only return a single word either 'node' or 'react'. Do not return anything extra.
         the project context is ${prompt}
              `
        
      });
    
    
      console.log(response.text);
      return response.text
}