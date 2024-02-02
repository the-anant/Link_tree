import NextAuth from "next-auth"
import connectDB from "@/dbconfig/dbConfig"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google";
export const authOptions={
    adapter: MongoDBAdapter(connectDB),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }