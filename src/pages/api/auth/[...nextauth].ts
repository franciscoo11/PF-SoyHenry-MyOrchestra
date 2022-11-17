import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProviders from 'next-auth/providers/credentials'
import { prisma } from '../../../../lib/prisma'

export default NextAuth({
    providers:[
        CredentialsProviders({
            type:"credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "name@example.com"},
                password: { label: "password", type: "password", placeholder: "***********"},
                name: { label: "name", type: "text", placeholder: "Francisco Giudicatti"},
            },
            async authorize(credentials:any){ 
                const findUser = await prisma.user.findFirst({
                    where: {
                        email: credentials!.email
                    }
                })
                if(!findUser) return null
                if(credentials.password !== findUser.password) return null
                return findUser
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        
    ],
    callbacks: {
        jwt: async ({ token, user}) => {
          if ( user ) {
            token.id = user.id
          }
          return token
        },
        session: async ({ session, token }) => {
          if (token) {
            session.id = token.id;
          }
          return session;
        },
      },
    session:{
        strategy: "jwt"
    },
    secret: process.env.JWT_SECRET
})

