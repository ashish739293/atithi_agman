import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import prisma from "@/utils/prismadb";
import * as yup from 'yup';


const eventSchema = yup.object().shape({
    title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
    username: yup.string().required('Username is required'),
    date: yup.date().required('Date is required').min(new Date(), 'Event date must be in the future'),
});

export async function PUT(request) {
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

        const contentType = headers.get("content-type");
        if (!contentType || !contentType.includes("multipart/form-data")) {
            return NextResponse.json({ status: 400, message: "Invalid content type" }, { status: 400 });
        }

        const formData = await request.formData();
        let eventId = formData.get('eventId');
        const title = formData.get('title');
        const username = formData.get('username');
        let date = formData.get('date');
        const file = formData.get('file');

        eventId = parseInt(eventId, 10);

         // Validate form data using yup schema
         await eventSchema.validate({ title, username, date });

        const event = await prisma.events.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return NextResponse.json({ status: 404, message: "Event not found" }, { status: 404 });
        }

        if (event.user_id !== decoded.userId) {
            return NextResponse.json({ status: 403, message: "You are not authorized to update this event" }, { status: 403 });
        }

        let filePath;
        if (file && file.name) {
            const fileExt = path.extname(file.name);
            const uniqueFileName = `${uuidv4()}${fileExt}`;
            filePath = path.join('/uploads', uniqueFileName);
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(`./public${filePath}`, buffer);
        }

        const updatedEvent = await prisma.events.update({
            where: { id: eventId },
            data: {
                title: title || event.title,
                // username: username || event.username,
                date: date ? new Date(date) : event.date,
                filePath: filePath || event.filePath,
            },
        });

        return NextResponse.json({ status: 200, message: "Event updated successfully", data: updatedEvent });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, error: error.message }, { status: 500 });
    }
}
