import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import prisma from "@/utils/prismadb";

export async function DELETE(request) {
    try {
        const headers = request.headers;
        const authHeader = headers.get('authorization');

        if (!authHeader) {
            return NextResponse.json({ status: 401, message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ status: 401, message: "Invalid or expired token" }, { status: 401 });
        }

        if (!decoded || !decoded.userId) {
            return NextResponse.json({ status: 401, message: "Token verification failed or invalid user" }, { status: 401 });
        }

        const url = new URL(request.url);
        let eventId = url.searchParams.get("eventId");
        if (!eventId) {
            return NextResponse.json({ status: 400, message: "Event ID is required" }, { status: 400 });
        }

        eventId = parseInt(eventId, 10);

        console.log("Event ID:", typeof eventId);
        console.log("Event ID:", eventId);
        
        // Fetch the event from the database
        const event = await prisma.events.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return NextResponse.json({ status: 404, message: "Event not found" }, { status: 404 });
        }

        if (event.user_id !== decoded.userId) {
            return NextResponse.json({ status: 403, message: "You are not authorized to delete this event" }, { status: 403 });
        }
        await prisma.events.delete({
            where: { id: eventId },
        });

        return NextResponse.json({ status: 200, message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, error: error.message }, { status: 500 });
    }
}
