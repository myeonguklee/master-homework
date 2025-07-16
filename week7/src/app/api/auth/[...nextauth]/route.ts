import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { supabase } from "@/lib/supabase";

const handler = NextAuth({
  providers: [
    // 소셜 로그인 프로바이더들
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // Supabase 연동 Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Supabase 인증
          const {
            data: { user },
            error,
          } = await supabase.auth.signInWithPassword({
            email: credentials?.email!,
            password: credentials?.password!,
          });

          if (user && !error) {
            return {
              id: user.id,
              name: user.user_metadata?.full_name || user.email,
              email: user.email,
              image: user.user_metadata?.avatar_url,
            };
          }

          return null;
        } catch (error) {
          console.error("Supabase auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
