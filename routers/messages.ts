import express from "express";
import fileDb from "../fileDb";
import {MessageWithoutId} from "../types";

const messageRouter = express.Router();

messageRouter.get("/", async (req, res) => {
    const messages = await fileDb.getItems();
    res.send(messages);
});

messageRouter.get("/:id", async (req, res) => {
    const message = await fileDb.getItems();
    const messageFindById = message.find((message) => message.id === req.params.id);
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