import 'dotenv/config'

import OpenAI from "openai";
import { zodTextFormat } from 'openai/helpers/zod.js';
import { z } from 'zod';
const client = new OpenAI();

async function main() {

    const step = z.object({
        explaination: z.string(),
        code: z.string()
    })

    const EntitiesSchema = z.object({
        step: step,
    });



    const stream = client.responses.stream({
        model: "gpt-4o-mini",
        input: [
            { "role": "user", "content": "create a simple todo app, i need only code, do not give anything else in response " },
        ],
        text: {
            format: zodTextFormat(EntitiesSchema, "entities"),
        },
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

main();
