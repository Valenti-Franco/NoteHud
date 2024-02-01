import axios from "axios"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import https from "https";

const handler = NextAuth(
    {
        providers: [
            CredentialsProvider({
                // The name to display on the sign in form (e.g. 'Sign in with...')
                name: 'Credentials',

                credentials: {
                    username: { label: "Username", type: "text", placeholder: "jsmith" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req) {

                    // const res = await fetch("/your/endpoint", {
                    //   method: 'POST',
                    //   body: JSON.stringify(credentials),
                    //   headers: { "Content-Type": "application/json" }
                    // })


                    try {
                        const res = await axios.post(
                            "https://localhost:7014/api/Usuarios/authenticate",
                            {
                                nombre: credentials.email,
                                password: credentials.password,
                            },
                            {
                                // Agrega esta opción para aceptar certificados autofirmados
                                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                            }
                        );






                        const res2 = await axios(
                            "https://localhost:7014/api/Usuarios/ObtenerUsuario",
                            {
                                httpsAgent: new https.Agent({ rejectUnauthorized: false }),

                                headers: {
                                    Authorization: `Bearer ${res.data}`, // Agrega el token JWT en la cabecera de autorización
                                }
                            }


                        );



                        const user = res2.data

                        // If no error and we have user data, return it
                        if (user) {
                            user.token = res.data; // Agrega el token a las propiedades del usuario
                            return user;
                        }
                        // Return null if user data could not be retrieved
                        return null
                    } catch (error) {
                        console.log(error)
                    }

                }
            })
        ],
        callbacks: {
            async jwt({ token, user }) {
                return { ...token, ...user };
            },
            async session({ session, token }) {
                session.user = token
                return session;
            },
        },
        pages: {
            signIn: "/Signin", // Ruta a tu página de inicio de sesión personalizada
        },
        secret: process.env.JWT_SECRET
    })

export { handler as GET, handler as POST }

