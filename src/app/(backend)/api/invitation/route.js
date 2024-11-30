import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prismadb';

export async function POST(request) {
    try {
        const { name, mobile, memberCount } = await request.json();
        const url = request.nextUrl;
        const username = url.pathname.split('/')[2];

        const updatedGuest = await prisma.guest_lists.updateMany({
            where: {
                user: { username: username },
                mobile: mobile,
            },
            data: {
                receive: memberCount,
            },
        });

        if (updatedGuest.count > 0) {
            return NextResponse.json({
                message: 'Invitation updated successfully!',
                username: username,
            });
        } else {
            return NextResponse.json(
                { message: 'No matching guest found to update.' },
                { status: 404 }
            );
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error submitting invitation. Please try again.' }, { status: 500 });
    }
}