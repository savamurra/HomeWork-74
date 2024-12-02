export interface Message {
    message: string;
    dateTime: string;
}

export type MessageWithoutId = Omit<Message, "dateTime">