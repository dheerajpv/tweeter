import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { ITweet } from "../models/Tweet";

const Home = () => {
    const [session, loading] = useSession();
    const [tweets, setTweets] = useState<ITweet[]>([]);

    useEffect(() => {
        if (loading) return;
        if (!session && !loading) return;

        (async () => {
            const res = await fetch("/api/tweets");
            const data = await res.json();
            setTweets(data);
        })();
    }, [loading]);

    return <main>{JSON.stringify(tweets)}</main>;
};

export default Home;
