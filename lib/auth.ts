import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await connectDB();

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        }).select('+password');

        if (!user) throw new Error('No account found');

        if (user.disabled) {
          throw new Error('This account has been disabled');
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) throw new Error('Incorrect password');

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          disabled: user.disabled,
        };
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.disabled = (user as { disabled?: boolean }).disabled ?? false;
        token.lastDbCheck = Date.now();
      }

      const shouldRefreshFromDb =
        trigger === 'update' ||
        !token.lastDbCheck ||
        Date.now() - (token.lastDbCheck as number) > 30_000;

      if (token.email && shouldRefreshFromDb) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email }).select(
          'role disabled',
        );
        if (dbUser) {
          token.role = dbUser.role;
          token.disabled = dbUser.disabled;
        }
        token.lastDbCheck = Date.now();
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id) session.user.id = token.id as string;
      if (token?.role)
        session.user.role = token.role as
          | 'superadmin'
          | 'marketing'
          | 'cs'
          | 'hr';
      if (typeof token?.disabled === 'boolean') {
        session.user.disabled = token.disabled;
      }
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },

  events: {
    async signIn({ user }) {
      await connectDB();
      const signedInAt = new Date();

      const filter = user?.id
        ? { _id: user.id }
        : user?.email
          ? { email: user.email.toLowerCase() }
          : null;

      if (!filter) return;

      await User.updateOne(filter, { $set: { lastSignedInAt: signedInAt } });
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
