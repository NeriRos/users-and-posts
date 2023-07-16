export type Address = {
    street: string
    city: string
    zipcode: string
    suite: string
};

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public address: Address,
    ) {
    }

    static fromJson(json: any): User {
        return new User(
            json.id,
            json.name,
            json.email,
            json.address,
        )
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            address: this.address,
        }
    }
}