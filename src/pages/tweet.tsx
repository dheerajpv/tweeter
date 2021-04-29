import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";
import { FC, FormEvent, useState } from "react";

const Tweet: FC = () => {
    const [session, loading] = useSession();
    const router = useRouter();

    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    if (loading) return null;
    if (!loading && !session) signIn("google");

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!content) {
            setError("Empty Tweet!");
            return;
        } else if (content.length > 256) {
            setError("Length Exceeded 256 Characters");
            return;
        }

        try {
            const res = await fetch("/api/tweets/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });

            console.log("posted");

            if (res.status !== 204) {
                const data = await res.json();

                console.log(data);
            }

            router.push("/");
        } catch (e) {
            setError("There was a problem processing your tweet.");
        }
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <p>Start Tweeting!</p>
                <textarea
                    autoFocus
                    placeholder="Tweet"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Tweet!</button>
            </form>
            <div className="error">{error}</div>
        </div>
    );
};

export default Tweet;
