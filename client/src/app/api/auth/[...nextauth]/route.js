import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await fetch(
        `${process.env.NEXTAUTH_URL}/users/user/email/${profile.email}`
      );

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        // const userExists = await User.findOne({ email: profile.email });
        const userExists = await fetch(
          `${process.env.NEXTAUTH_URL}/users/user/email/${profile.email}`
        );

        if (!userExists) {
          await fetch(`${process.env.NEXTAUTH_URL}/users/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: profile.email,
              password: 'generate_a_secure_password', // You might want to generate a secure password here
              first_name: profile.first_name,
              last_name: profile.last_name
            })
          });
        }

        return true;
      } catch (error) {
        console.log('Error connecting to DB:', error);
      }
    }
  }
});

export { handler as GET, handler as POST };
