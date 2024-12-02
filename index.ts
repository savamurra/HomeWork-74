import express from "express";
import messageRouter from "./routers/messages";
import fileDb from "./fileDb";
import { promises as fs } from "fs";
import path from "path";

const app = express();
const port = 8000;

app.use(express.json());

app.use('/messages', messageRouter);

function generateFileName() {
    const date = new Date().toISOString();
    return path.join(messagesFolder, `${date}.txt`);
}

const messagesFolder = path.join(__dirname, "messages");

const run = async () => {
    const fileName = generateFileName();
   try {
       await fs.access(fileName);
       await fileDb.init();
   } catch (e) {
       console.error(e);
       await fs.mkdir(messagesFolder, { recursive: true });
       await fs.writeFile(fileName, JSON.stringify([]));
       await fileDb.init();
   }

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    })
}

run().catch(err => {
    console.log(err)
});
