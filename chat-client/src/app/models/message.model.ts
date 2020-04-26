export class Message {

    constructor(
        private readonly sender: string,
        private readonly content: string,
        private readonly receiver: string = null
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
