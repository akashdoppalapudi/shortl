import { PrismaClient } from '@prisma/client';

declare global {
	// global prisma client
	var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient(); // use global prisma client or create a new one

if (process.env.NODE_ENV !== 'production') global.prisma = prisma; // only use global prisma client in development
