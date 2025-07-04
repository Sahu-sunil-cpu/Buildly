import { Router } from "express";
import { getChat } from "../openai/chat";
import { main } from "../openai/gemini";



export const chatRoute = Router();

chatRoute.post("/chat", async (req, res) => {
    const data = req.body;
    console.log(req.body)

   const response = await main(data, res);

   //res.send(response)

  
})