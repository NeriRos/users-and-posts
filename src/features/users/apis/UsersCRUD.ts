import {NextApiResponse} from "next";
import {UsersService} from "@/features/users/services/UsersService";
import {UsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {UsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";
import {createApiRequestHandler, MethodToHandlerMapType} from "@/core/api/apiRequestHandler";

const usersService = UsersService({
    apiRepository: UsersApiRepository(),
    dbRepository: UsersDbRepository()
});

export const handleUsersCRUD = createApiRequestHandler({
    GET: async (req, res: NextApiResponse<User[]>) => {
        const users = await usersService.getAllUsers();

        return res.status(200).json(users);
    }
});