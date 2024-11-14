import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import prisma from "@/utils/prismadb";

export async function GET(request) {
    try {
        const headers = request.headers;

        // Get and validate Authorization header
        const authHeader = headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ status: 401, message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        let decoded;

        // Verify JWT token
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error("Token verification failed:", err);
            return NextResponse.json({ status: 401, message: "Invalid or expired token" }, { status: 401 });
        }

        // Ensure the decoded token has userId
        if (!decoded || !decoded.userId) {
            return NextResponse.json({ status: 401, message: "Invalid token or missing user data" }, { status: 401 });
        }

        // Get the search query from URL parameters
        const url = new URL(request.url);
        const searchTerm = url.searchParams.get('search') || '';

        // Retrieve events for the user_id from the database
        const events = await prisma.events.findMany({
            where: {
                user_id: decoded.userId,
                ...(searchTerm && {
                    title: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                }),
            },
        });

        if (!events || events.length === 0) {
            return NextResponse.json({ status: 404, message: "No events found for this user" }, { status: 404 });
        }

        // Return the events associated with the user
        return NextResponse.json({ status: 200, message: "Events retrieved successfully", data: events });
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json({ status: 500, error: error.message }, { status: 500 });
    }
}