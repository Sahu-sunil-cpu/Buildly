import 'dotenv/config'

import OpenAI from "openai";
import { zodTextFormat } from 'openai/helpers/zod.js';
import { z } from 'zod';
import { getSystemPrompt } from '../prompts/base';
import type { Response } from 'express';


const client = new OpenAI();

export async function getChat(prompt: any, res: Response) {
    const stream =  await client.chat.completions.create({
        model: "gpt-4o-mini",
        
        messages: [
            { role: "system", content: getSystemPrompt() },
            prompt[0],
            prompt[1],
            prompt[2]
        ],
        stream: true
      
    })
      

//     console.log(stream.output_text);

//    return stream.output_text;

for await (const chunk of stream) {
    res.write(chunk.choices[0]?.delta?.content || "");
    console.log(`Sent: ${chunk.choices[0]?.delta.content}`);
}

res.end();


}

