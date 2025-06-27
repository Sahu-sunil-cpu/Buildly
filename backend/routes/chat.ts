import { Router } from "express";
import { getChat } from "../openai/chat";



export const chatRoute = Router();

chatRoute.post("/chat", async (req, res) => {
    const message = req.body.message;
    console.log(message)

    const response = await getChat(message);

    res.json({response});
})