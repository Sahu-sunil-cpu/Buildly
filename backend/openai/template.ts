import 'dotenv/config'

import OpenAI from "openai";
import { zodTextFormat } from 'openai/helpers/zod.js';
import { z } from 'zod';


const client = new OpenAI();

export async function getTemplate(prompt: string) {


    const response = await client.responses.create({
        model: "gpt-4o-mini",
        input: `Return either node or react based on what do you think this project should be.
         Only return a single word either 'node' or 'react'. Do not return anything extra.
         the project context is ${prompt}
              `
    });

    const result = await response.output_text;

    console.log(result);

    return result;
}


