import {NextApiRequest, NextApiResponse} from "next";
import {UsersService} from "@/features/users/services/UsersService";
import {UsersApiRepository} from "@/features/users/repositories/UsersApiRepository";

const usersService = UsersService({
    apiRepository: UsersApiRepository()
});

const methodToHandlerMap: { [key: string]: Function } = {
    GET: usersService.getAllUsers
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