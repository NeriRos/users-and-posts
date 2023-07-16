import {User} from "@/features/users/models/User";

export interface UsersRepository {
    getUsers: () => Promise<User[]>;
    getUserById: (userId: number) => Promise<User | undefined>;
}
