import {NextApiResponse} from "next";
import {UsersService} from "@/features/users/services/UsersService";
import {createUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {createUsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";
import {createApiRequestHandler} from "@/core/api/apiRequestHandler";

const usersService = UsersService({
    apiRepository: createUsersApiRepository(),
    dbRepository: createUsersDbRepository()
});

export type GetUsersResponse = {
    users: User[];
    usersCount: number;
}

export const handleUsersCRUD = createApiRequestHandler({
    GET: async (req, res: NextApiResponse<GetUsersResponse>) => {
        const count = req.query.count ? Number(req.query.count) : undefined;
        const page = req.query.page ? Number(req.query.page) : undefined;

        const usersCount = await usersService.countUsers();
        const users = await usersService.getUsers(count, page);

        return res.status(200).json({users, usersCount});
    }
});