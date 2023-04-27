import NextAuth, { Awaitable, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const client = await clientPromise;
        const user = await client
          .db("member")
          .collection("member")
          .findOne({ name: username });
        const isMatch = await bcrypt.compare(password, user.pass);

        if (user && isMatch) {
          delete user.pass;
          delete user.token;
          return user;
        } else {
          return "Please Register";
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (token && token.id) session.user.id = token.id;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user && user._id) token.id = user._id;
      return token;
    },
  },
  secret: process.env.SECRET_KEY,
});
