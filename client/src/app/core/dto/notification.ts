export class Notification {
    constructor(
        public _id: string,
        public userId: string,
        public message: string,
        public read: boolean,
        public createdAt: Date
    ) {}
}
