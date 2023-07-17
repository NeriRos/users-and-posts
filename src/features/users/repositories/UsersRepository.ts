import {User} from "@/features/users/models/User";
import {PaginationParameters} from "@/core/components/Table";

export interface UsersRepository {
    getUsers: (paginate?: PaginationParameters) => Promise<User[]>;
    getUserById: (userId: number) => Promise<User | undefined>;
}
