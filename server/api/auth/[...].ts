import GoogleProvider from 'next-auth/providers/google';
import { NuxtAuthHandler } from '#auth';

const providers = [];
const { NODE_ENV, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } =
  useRuntimeConfig();

if (NODE_ENV === 'production') {
  providers.push(GoogleProvider({
    clientId: GOOGLE_CLIENT_ID!,
    clientSecret: GOOGLE_CLIENT_SECRET!,
  }));
} else {
  // @ts-expect-error You need to use .default here for it to work during SSR
  providers.push(GoogleProvider.default({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }));
}

export default NuxtAuthHandler({
  secret: AUTH_SECRET,
  providers: [GoogleProvider({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  })],
  pages: {
    signIn: '/login',
    error: '/unauthorized'
  },
});