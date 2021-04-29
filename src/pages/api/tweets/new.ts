import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import mongo from "../../../middleware/mongo";
import Tweet from "../../../models/Tweet";

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).json({
            error: "Method Not Allowed",
            hint: "use method POST",
        });
        return;
    }

    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({
            error: "Unauthorized",
            hint: "sign in",
        });
        return;
    }

    const { content, image } = req.body;

    await Tweet.create({
        // @ts-ignore
        author: session.id,
        content,
        image,
    });

    res.status(204).send({});
};

export default mongo(handler);
