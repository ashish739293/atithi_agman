import { NextResponse } from "next/server";
import * as yup from 'yup';
import prisma from "@/utils/prismadb";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import * as xlsx from 'xlsx';

const eventSchema = yup.object().shape({
    title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
    username: yup.string().required('Username is required'),
    date: yup.date().required('Date is required').min(new Date(), 'Event date must be in the future'),
});

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
        await eventSchema.validate({ title, username, date });

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

        // Generate the invite link with the full domain and username
        const inviteLink = `http://atithiagman.com/invite/${username}`;

        // Create the event in the database with the invite link and get event_id
        const event = await prisma.events.create({
            data: {
                title: title,
                username: username,
                date: new Date(date),
                filePath: filePath,
                user_id: decoded.userId,
                link: inviteLink,  // Store the generated invite link
            },
        });

        // Parse Excel file and store data into guest_lists table with user_id and event_id
        let guestCount = 0;
        if (file && file.name) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const workbook = xlsx.read(buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const guestData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

            console.log("<><><><>guestData<><><><>",guestData)
            // Map the Excel rows to match database fields
            const guestList = guestData.slice(1).map(row => ({
                name: row[0],
                mobile: row[1],
                send: row[2],
                user_id: decoded.userId,   // Associate with user_id
                event_id: event.id,        // Associate with event_id
            }));

            // Store each guest in the guest_lists table
            await prisma.guest_lists.createMany({
                data: guestList,
                skipDuplicates: true,
            });

            // Count the number of guests added
            guestCount = guestList.length;
        }

        // Update the total_send column in the events table with guestCount
        await prisma.events.update({
            where: { id: event.id },
            data: { total_send: guestCount },
        });

        return NextResponse.json({
            status: 200,
            message: "Event Created Successfully",
            data: {
                event,
                guestCount,
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, error: error.message }, { status: 500 });
    }
}
