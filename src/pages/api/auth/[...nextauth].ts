import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            async profile(profile) {
                return {
                    id: profile.id as string,
                    name: profile.name,
                    email: profile.image,
                    image: profile.image,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET!,
    database: process.env.MONGO_URI!,
    callbacks: {
        async session(session, token) {
            if (token.accessToken) session.accessToken = token.accessToken;
            if (token.refreshToken) session.refreshToken = token.refreshToken;
            if (token.id) session.id = token.id;
            return session;
        },
    },
});
