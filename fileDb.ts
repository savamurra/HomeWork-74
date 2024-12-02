import {Message, MessageWithoutId} from "./types";
import {promises as fs} from "fs"
import path from "path";


const messagesFolder = path.join(__dirname, "messages");
const date = new Date().toISOString();

const newFile = () => {
    return path.join(messagesFolder, `${date}.txt`);
}

let data: Message[] = [];

const fileDb = {
    async init () {
        await fs.mkdir(messagesFolder, { recursive: true });
        try {
            const fileName = newFile();
            const fileContent = await fs.readFile(fileName);
            data = JSON.parse(fileContent.toString());
        } catch (e) {
            console.error(e);
        }
    },

    async getItems () {
       const sortedMessage =  data.sort((a: Message, b: Message) => {
            return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
        });
       return sortedMessage.slice(0,5);
    },

    async addItem (item: MessageWithoutId) {
        const dateTime = date;
        const message = {dateTime, ...item};
        data.push(message);
        await this.save();
        return message;
    },
    async save () {
        const fileName = newFile();
        return fs.writeFile(fileName, JSON.stringify(data));
    }
}

export default fileDb;

