import 'dotenv/config'

import OpenAI from "openai";
import { zodTextFormat } from 'openai/helpers/zod.js';
import { z } from 'zod';
import { getSystemPrompt } from '../prompts/base';
const client = new OpenAI();

export async function getChat(prompt: any) {

 


    const stream = client.responses.stream({
        model: "gpt-4o-mini",
        
        input: [
            { role: "system", content: getSystemPrompt() },
            prompt[0],
            prompt[1],
            prompt[2]
        ],
      
    })
        .on("response.refusal.delta", (event) => {
            process.stdout.write(event.delta);
        })
        .on("response.output_text.delta", (event) => {
            process.stdout.write(event.delta);
        })
        .on("response.output_text.done", () => {
            process.stdout.write("\n");
        })

    const result = await stream.finalResponse();

    console.log(result);



}

