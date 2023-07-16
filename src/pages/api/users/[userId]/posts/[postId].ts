import type {NextApiRequest, NextApiResponse} from 'next'
import {handlePostCRUD} from "@/features/posts/apis/PostCRUD";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return handlePostCRUD(req, res);
}
