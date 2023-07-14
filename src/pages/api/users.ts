import type {NextApiRequest, NextApiResponse} from 'next'
import {handleUsersCRUD} from "@/features/users/apis/UsersCRUD";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return handleUsersCRUD(req, res);
}
