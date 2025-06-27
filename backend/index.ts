import express from "express"
import { templateRouter } from "./routes/template";
import { chatRoute } from "./routes/chat";
import cors from "cors"

const app = express();

app.use(cors())

app.use(express.json());
app.use("/api/v1", templateRouter);
app.use("/api/v1", chatRoute )


app.listen(3000, () => {
    console.log("listening on port 3000");
})