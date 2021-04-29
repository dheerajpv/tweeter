import { NextApiHandler } from "next";
import mongo from "../../../middleware/mongo";
import Tweet from "../../../models/Tweet";

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== "GET") {
        res.status(405).json({
            error: "Method Not Allowed",
            hint: "use method GET",
        });
        return;
    }

    const tweets = await Tweet.find();
    res.status(200).json(tweets);
};

export default mongo(handler);
