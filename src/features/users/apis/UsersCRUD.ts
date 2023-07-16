import {NextApiResponse} from "next";
import {UsersService} from "@/features/users/services/UsersService";
import {createUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {createUsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";
import {createApiRequestHandler, MethodToHandlerMapType} from "@/core/api/apiRequestHandler";

const usersService = UsersService({
    apiRepository: createUsersApiRepository(),
    dbRepository: createUsersDbRepository()
});

export const handleUsersCRUD = createApiRequestHandler({
    GET: async (req, res: NextApiResponse<User[]>) => {
        const users = await usersService.getAllUsers();

        return res.status(200).json(users);
    }
});