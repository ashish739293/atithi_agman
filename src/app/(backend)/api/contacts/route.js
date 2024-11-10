/* ******************************************************************************
|                         PURPOSE OF API :: Create Contact Data                 |
| *******************************************************************************
| POST() - Authenticates an agent, validates credentials, and issues a JWT.
*/

import { NextResponse } from "next/server";
import * as yup from 'yup';
import prisma from "@/utils/prismadb";

// Define request schema for validation
const schema = yup.object().shape({
    name: yup.string().required("name is required"),
    mobile: yup.string().required("number is required"),
    message: yup.string().notRequired()
});

export async function POST(request) {
    try {
        // Parse and validate request payload
        const contentType = request.headers.get("content-type");
        let body = await (contentType && contentType.includes("application/json") ? request.json() : {});
        await schema.validate(body);

        const { name, mobile, message } = body;

        await prisma.contact_data.create({data:{name:name, mobile:mobile, message:message}});

        // Send successful login response with user data and token
        return NextResponse.json({ status: 200, message: "Thank You"});

    } catch (error) {
        // Return error response for validation or processing issues
        return NextResponse.json({ status: 500, error: error.message }, { status: 500 });
    } finally {
        // Ensure database connection is properly closed
        prisma.$disconnect();
    }
}
