export class Message {

    constructor(
        private readonly sender: string,
        private readonly content: string
    ) { }

    public getSender(): string {
        return this.sender;
    }

    public getContent(): string {
        return this.content;
    }
}
