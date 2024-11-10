import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import prisma from "@/utils/prismadb";

export async function GET(request) {
    try {
        const headers = request.headers;

        // Get Authorization header and verify JWT
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

        if (!decoded || !decoded.userId) {
            return NextResponse.json({ status: 401, message: "Token verification failed or invalid user" }, { status: 401 });
        }

        // Get query parameters (event_id)
        const url = new URL(request.url);
        const eventId = url.searchParams.get("event_id");

        if (!eventId) {
            return NextResponse.json({ status: 400, message: "Event ID is required" }, { status: 400 });
        }

        // Validate that the event belongs to the authenticated user
        const event = await prisma.events.findUnique({
            where: { id: parseInt(eventId) },
            include: {
                guest_lists: true  // Include guest list data in the response
            }
        });

        if (!event) {
            return NextResponse.json({ status: 404, message: "Event not found" }, { status: 404 });
        }

        if (event.user_id !== decoded.userId) {
            return NextResponse.json({ status: 403, message: "Access denied" }, { status: 403 });
        }

        // Return the guest list data
        return NextResponse.json({
            status: 200,
            message: "Guest list fetched successfully",
            data: event.guest_lists
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, error: error.message }, { status: 500 });
    }
}
