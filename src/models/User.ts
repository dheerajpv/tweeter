import { Document, model, Model, models, Schema } from "mongoose";

const User = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        followers: {
            type: [Schema.Types.ObjectId],
            default: [],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export interface IUser extends Document<any> {
    name: string;
    email: string;
    image: string;
    followers: string[];
    createdAt: Date;
    updatedAt: Date;
}

export default (models["users"] as Model<IUser>) || model<IUser>("users", User);
