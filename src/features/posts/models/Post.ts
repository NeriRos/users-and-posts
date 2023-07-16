export class Post {
    constructor(
        public id: number,
        public title: string,
        public body: string,
        public authorId: number,
    ) {
    }

    static fromJson(json: any): Post {
        return new Post(
            json.id,
            json.title,
            json.body,
            json.authorId,
        )
    }

    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            body: this.body,
            authorId: this.authorId,
        }
    }
}