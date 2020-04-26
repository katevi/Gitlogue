export class Message {

    constructor(
        private readonly sender: string,
        private readonly receiver: string,
        private readonly content: string
    ) { }

    public getSender(): string {
        return this.sender;
    }

    public getReceiver(): string {
        return this.receiver;
    }

    public getContent(): string {
        return this.content;
    }
}
