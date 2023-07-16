import type {NextApiRequest, NextApiResponse} from 'next'
import {handlePostsCRUD} from "@/features/posts/apis/PostsCRUD";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return handlePostsCRUD(req, res);
}
