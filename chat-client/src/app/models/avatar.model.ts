export class Avatar {
    constructor(
        private file : File = null,
        private filename : string = null
    ) {}

    public getFilename() : string {
        return this.filename;
    }

    public getFile() : File {
        return this.file;
    }
}