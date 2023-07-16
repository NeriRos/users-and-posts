import {NextApiRequest, NextApiResponse} from "next";
import {UsersService} from "@/features/users/services/UsersService";
import {UsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {UsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";

const usersService = UsersService({
    apiRepository: UsersApiRepository(),
    dbRepository: UsersDbRepository()
});

const methodToHandlerMap: { [key: string]: Function } = {
    GET: (req: NextApiRequest, res: NextApiResponse<Promise<User[]>>) => {
        return res.status(200).json(usersService.getAllUsers());
    }
}

export const handleUsersCRUD = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const handler = methodToHandlerMap[req.method || ""];

    if (!handler) {
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    try {
        await handler(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}