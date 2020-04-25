import { NgxLinkifyjsService, NgxLinkifyOptions } from 'ngx-linkifyjs';

export class Message {
    private linkifyService: NgxLinkifyjsService = new NgxLinkifyjsService();

    constructor(
        private readonly sender: string,
        private readonly content: string
    ) { }

    public getSender(): string {
        return this.sender;
    }

    public getContent(): string {
        const options: NgxLinkifyOptions =
        {
            className: 'linkifiedYES',
            target : {
                url : '_self'
            }
        };

        let linkifiedContent = this.linkifyService.linkify(this.content, options);
        return linkifiedContent;
    }
}
