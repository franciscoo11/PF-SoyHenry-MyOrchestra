import NextAuth, { NextAuthOptions} from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import {prisma} from '../../../../lib/prisma'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcryptjs from 'bcryptjs';

const authOptions: NextAuthOptions = ({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              },
        }),
        CredentialProvider({
            name:"credentials",
            credentials: {
                email: { label: 'email', type: "email", placeholder:'john@example.com'},
                password: { label: 'password', type: 'password', placeholder:'************'},
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email:credentials?.email
                    },
                    include:{
                        Rol:true
                    }
                })
                
                if(!user) throw new Error('Usuario no registrado, por favor registrate.')
                const isPasswordValid = await bcryptjs.compare(credentials!.password, user.password)
                if(!isPasswordValid) throw new Error('Password is incorrect')

                return user
            }
        })
    ],
    // debug: process.env.NODE_ENV === "development",
    callbacks:{
        jwt: ({token, user}) => {
            if ( user ) {
                token.id = user.id
            }
            return token
        },
        session: ({ session, token }) => {
            if(token){
                session.id = token.id;
            }

            return session
        }
    },
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
})

export default NextAuth(authOptions);