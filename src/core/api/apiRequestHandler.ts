import {NextApiRequest, NextApiResponse} from "next";

export type HandlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;

export type MethodToHandlerMapType = {
    GET?: HandlerType
    POST?: HandlerType,
    PUT?: HandlerType,
    DELETE?: HandlerType,
};

export const createApiRequestHandler = (
    methodToHandlerMap: MethodToHandlerMapType
) => async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    const handler = methodToHandlerMap[req.method as keyof MethodToHandlerMapType];

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