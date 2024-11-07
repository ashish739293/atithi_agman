/* ******************************************************************************
|                         PURPOSE OF API :: Register New User                     |
| *******************************************************************************
| POST() - Registers a new user by validating inputs, hashing the password, and
|          storing user data in the database. Generates and returns a JWT.
*/

import { NextResponse } from "next/server";
import * as yup from 'yup';
import prisma from "@/utils/prismadb";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Validation schema for required parameters
const Schema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters long')
        .matches(/^[a-zA-Z0-9 ]+$/, 'Name cannot contain special characters')
        .matches(/^\S(?:.*\S)?$/, 'Name cannot contain leading or trailing spaces'),
    
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .test('is-present', 'Email is required', value => value?.trim() !== '')
        .matches(/^[^\s@]+@[^\s@]+\.(com|in|co|org|net|gov|edu|biz)(\.[a-zA-Z]{2})?$/, 'Invalid email address')
        .test('single-extension', 'Only one extension is allowed per email address', value =>
            (value.split('@')[1].match(/\./g) || []).length <= 2)
        .matches(/^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)?@[^\s@]+$/, 'Only letters, numbers, dots, and underscores are allowed before the @ symbol and only one dot is allowed'),
    
    mobile: yup.string()
        .matches(/^[0-9]{10}$/, 'Invalid mobile number')
        .required('Mobile is required'),
    
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/^(?![\s@!#$%^&*()_+={}[\]:";'<>?,./\\|`~])[A-Za-z\d@$!%*?&]{6,}$/, 'Password cannot contain only spaces or special characters'),
});

export async function POST(request) {
    try {
        // Parse and validate the request payload
        const contentType = request.headers.get("content-type");
        let body = await (contentType && contentType.includes("application/json") ? request.json() : {});
        await Schema.validate(body);

        const { name, email, mobile, password } = body;

        // Hash the password with bcrypt
        const saltRounds = 2;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Check if the user already exists
        const user_data = await prisma.users.findUnique({ where: { email } });

        if (!user_data) {
            // Create a new user in the database
            const user = await prisma.users.create({
                data: {
                    name,
                    username: email,
                    mobile,
                    email,
                    type: 'User',
                    password: hashedPassword,
                    parent: 1,
                    main_user: 1,
                    status: 'Active'
                },
            });

            // Generate JWT for the new user
            const token = jwt.sign(
                { userId: user.id, email, mobile: user.mobile },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            // Attach the token to the user data for response
            user.token = token;

            // Return success response with user data and token
            return NextResponse.json({ status: 200, message: "User Created Successfully", data: user });
        } else {
            // Return response if the user already exists
            return NextResponse.json({ status: 200, message: "User Already Exists", data: user_data });
        }
    } catch (error) {
        // Return error response for validation or processing issues
        return NextResponse.json({ status: 500, error: error.message }, { status: 500 });
    }
}
