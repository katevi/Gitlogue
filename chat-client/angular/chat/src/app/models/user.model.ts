export class User {
    constructor(
        private fullName: string,
        private userName: string,
        private password: string,
        private githubAccUrl: string
    ) { }

    public getFullName(): string {
        return this.fullName;
    }

    public getUsername(): string {
        return this.userName;
    }

    public getPassword(): string {
        return this.password;
    }

    public getGethibAccUrl(): string {
        return this.githubAccUrl;
    }
}
