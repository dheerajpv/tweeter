import { Document, model, Model, models, Schema } from "mongoose";

const Tweet = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        hearts: {
            type: Number,
            required: true,
            default: 0,
        },
        retweet: {
            type: Schema.Types.ObjectId,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export interface ITweet extends Document {
    author: string;
    content: string;
    hearts: number;
    retweet: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export default (models["tweets"] as Model<ITweet>) ||
    model<ITweet>("tweets", Tweet);
