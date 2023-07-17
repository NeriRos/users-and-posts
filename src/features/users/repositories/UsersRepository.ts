import {User} from "@/features/users/models/User";

export interface UsersRepository {
    getUsers: (count?: number, page?: number) => Promise<User[]>;
    getUserById: (userId: number) => Promise<User | undefined>;
}
