import { Router, Request, Response } from "express";
import { User } from "./types";

const router = Router();

type GetSearchParams = {
    id: string;
}

router.get('/', async (
    req: Request<any, any, any, GetSearchParams>,
    res: Response
) => {
    // const { query: { id } } = req;
    const { query: { id }, app: { locals: { mongoClient }} } = req;

    if (!id) {
        res
            .status(500)
            .json({ error: "Bad id" });
    }

    const collection = mongoClient
        .db('users')
        .collection<User>('users');

    const user = await collection.findOne({ _id: id });

    if (!user) {
        res.sendStatus(404);
    }

    res.json(user);
});

export default router;