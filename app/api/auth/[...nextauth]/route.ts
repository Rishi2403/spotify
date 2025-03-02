import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
const handler = NextAuth({
  // wanna use google here
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
//   callbacks:{
//     async signIn(params){
//       console.log("Sign in params",params);
//       try{
//             await prismaClient.user.create({
//                 data:{
//                     email:"",
//                     provider:"Google"
//                 }
//             })
//       }catch(){

//       }
//     }
//   }
// })

callbacks: {
  async signIn({ user, account, profile }) {
    console.log("Sign in params", user, account, profile);
    try {
      const existingUser = await prismaClient.user.findUnique({
        where: { email: "" },
      });

      if (!existingUser) {
        await prismaClient.user.create({
          data: {
            email: "",
            provider: "Google", // Use actual provider

          },
        });
      }

      return true; // Allow sign-in
    } catch (error) {
      console.error("Sign-in error:", error);
      return false; // Deny sign-in if error occurs
    }
  },
}
})

export { handler as GET, handler as POST }