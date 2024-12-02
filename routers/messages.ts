import express from "express";

import {MessageWithoutId} from "../types";
import fileDb from "../fileDb";

const messageRouter = express.Router();


messageRouter.get("/", async (req, res) => {
        const messages = await fileDb.getItems();
        res.send(messages);
});

messageRouter.get("/:dateTime", async (req, res) => {
    const message = await fileDb.getItems();
    const messageFindById = message.find((message) => message.dateTime === req.params.dateTime);
    res.send(messageFindById);
});

messageRouter.post("/", async (req, res) => {
    const message: MessageWithoutId = {
        message: req.body.message,
    }

    const saveMessage = await fileDb.addItem(message);
    res.send(saveMessage);
});

export default messageRouter;