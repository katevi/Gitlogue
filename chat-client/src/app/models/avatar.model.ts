export class Avatar {
    constructor(
        private file : File,
        private filename : string
    ) {}

    public getFilename() : string {
        return this.filename;
    }

    public getFile() : File {
        return this.file;
    }
}