import { NextResponse } from "next/server";
import * as yup from 'yup';
import prisma from "@/utils/prismadb";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

// const eventSchema = yup.object().shape({
//     title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
//     username: yup.string().required('Username is required'),
//     date: yup.date().required('Date is required').min(new Date(), 'Event date must be in the future'),
// });

export async function POST(request) {
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

        if (!decoded || !decoded.userId) {
            return NextResponse.json({ status: 401, message: "Token verification failed or invalid user" }, { status: 401 });
        }

        const contentType = headers.get("content-type");
        if (!contentType || !contentType.includes("multipart/form-data")) {
            return NextResponse.json({ status: 400, message: "Invalid content type" }, { status: 400 });
        }

        const formData = await request.formData();
        const title = formData.get('title');
        const username = formData.get('username');
        let date = formData.get('date');
        const file = formData.get('file');

        // Validate form data using yup schema
        // await eventSchema.validate({ title, username, date });

        let filePath;
        if (file && file.name) {
            const fileExt = path.extname(file.name);
            const uniqueFileName = `${uuidv4()}${fileExt}`;
            filePath = path.join('/uploads', uniqueFileName);
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(`./public${filePath}`, buffer);
        }

        // Ensure that the userId exists in the decoded token
        if (!decoded.userId) {
            return NextResponse.json({ status: 400, message: "Invalid userId in token" }, { status: 400 });
        }

        // Check if user exists in the database before creating the event
        const userExists = await prisma.users.findUnique({
            where: { id: decoded.userId },
        });

        if (!userExists) {
            return NextResponse.json({ status: 404, message: "User not found" }, { status: 404 });
        }
        // Create the event in the database
        const event = await prisma.events.create({
            data: {
                title: title, 
                username: username, 
                date: new Date(date),
                filePath: filePath ,
                user_id: decoded.userId,
            },
        });

        return NextResponse.json({ status: 200, message: "Event Created Successfully", data: event });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, error: error.message }, { status: 500 });
    }
}
