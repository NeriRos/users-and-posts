import {NextApiResponse} from "next";
import {UsersService} from "@/features/users/services/UsersService";
import {createUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {createUsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";
import {createApiRequestHandler} from "@/core/api/apiRequestHandler";
import {PAGINATION_PER_PAGE} from "@/core/components/Table/Pagination/consts";

const usersService = UsersService({
    apiRepository: createUsersApiRepository(),
    dbRepository: createUsersDbRepository()
});

export type GetUsersResponse = {
    users: User[];
    usersCount: number;
    test: any;
}

export const handleUsersCRUD = createApiRequestHandler({
    GET: async (req, res: NextApiResponse<GetUsersResponse>) => {
        const count = req.query.count ? Number(req.query.count) : PAGINATION_PER_PAGE[0];
        const page = req.query.page ? Number(req.query.page) : 1;

        const usersCount = await usersService.countUsers();
        const users = await usersService.getUsers({count, page});

        return res.status(200).json({users, usersCount, test: process.env.DATABASE_URL});
    }
});