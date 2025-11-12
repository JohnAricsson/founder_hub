import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { WriteClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      if (!profile?.id) return false;
      const githubId = Number(profile.id);
      if (isNaN(githubId)) return false;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: githubId,
        });

      if (!existingUser) {
        await WriteClient.create({
          _type: "author",
          id: githubId,
          name: user?.name || "No Name",
          username: profile.login || "unknown",
          email: user?.email || undefined,
          image: user?.image || undefined,
          bio: profile?.bio || undefined,
        });
      }

      return true;
    },

    async jwt({ token, profile }) {
      if (profile?.id) {
        const githubId = Number(profile.id);
        if (!isNaN(githubId)) {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: githubId,
            });

          if (user) {
            token.id = user._id;
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.id) {
        Object.assign(session, { id: token.id });
      }
      return session;
    },
  },

  session: {
    strategy: "jwt" as const,
  },

  secret: process.env.NEXTAUTH_SECRET,
});
