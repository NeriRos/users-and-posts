export type User = {
    id: number
    name: string
    email: string
    address: {
        street: string
        city: string
        zipcode: string
        suite: string
    }
};

export type Address = User['address'];