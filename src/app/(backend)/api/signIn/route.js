/* ******************************************************************************
|                         PURPOSE OF API :: Login the Panel                     |
| *******************************************************************************
| POST() - Authenticates an agent, validates credentials, and issues a JWT.
*/

import { NextResponse } from "next/server";
import * as yup from 'yup';
import prisma from "@/utils/prismadb";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define request schema for validation
const schema = yup.object().shape({
    username: yup.string().required("username is required"),
    password: yup.string().required("Password is required"),
    long_live_token: yup.string().oneOf(['0', '1']).notRequired()
});

export async function POST(request) {
    try {
        // Parse and validate request payload
        const contentType = request.headers.get("content-type");
        let body = await (contentType && contentType.includes("application/json") ? request.json() : {});
        await schema.validate(body);

        const { username, password } = body;

        // Retrieve user record from database by username
        const user_data = await prisma.users.findUnique({ where: { username } });

        // Return error if user does not exist
        if (!user_data) {
            return NextResponse.json({
                error: "Invalid credentials",
                message: "Invalid credentials.",
                status: 401,
                data: {}
            }, { status: 401 });
        }

        // Verify password against stored hash
        if (!(await bcrypt.compare(password, user_data.password))) {
            return NextResponse.json({
                error: "Invalid credentials",
                message: "Invalid credentials.",
                status: 401,
                data: {}
            }, { status: 401 });
        }

        // Generate JWT for authenticated session
        const token = jwt.sign(
            { userId: user_data.id, username: username, mobile: user_data.mobile },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Attach token to user data for response
        user_data.token = token;

        // Send successful login response with user data and token
        return NextResponse.json({ status: 200, message: "Logged In Successfully", data: user_data });

    } catch (error) {
        // Return error response for validation or processing issues
        return NextResponse.json({ status: 500, error: error.message }, { status: 500 });
    } finally {
        // Ensure database connection is properly closed
        prisma.$disconnect();
    }
}
