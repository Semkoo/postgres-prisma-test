import NextAuth from "next-auth";
import { authOptions } from "../../../../core/Auth/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
