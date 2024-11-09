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
        .required('name is required')
        .min(2, 'name must be at least 2 characters long')
        .matches(/^[a-zA-Z0-9 ]+$/, 'name cannot contain special characters')
        .matches(/^\S(?:.*\S)?$/, 'name cannot contain leading or trailing spaces'),
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .test('is-present', 'Email is required', value => value?.trim() !== '')
        .matches(/^[^\s@]+@[^\s@]+\.(com|in|co|org|net|gov|edu|biz)(\.[a-zA-Z]{2})?$/, 'Invalid email address')
        .test('single-extension', 'Only one extension is allowed per email address', value =>
            (value.split('@')[1].match(/\./g) || []).length <= 2)
        .matches(/^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)?@[^\s@]+$/, 'Only letters, numbers, dots, and underscores are allowed before the @ symbol and only one dot is allowed'),
    username: yup.string()
        .required('username is required')
        .matches(/^(?!0+$)[a-zA-Z0-9@_]+$/, 'username cannot contain special characters except @ and _, and cannot be only "0"')
        .test('not-only-space', 'username cannot consist only of spaces', value => !(/^\s+$/.test(value)))
        .test('not-only-special-characters', 'username cannot consist only of special characters', value => !(/^[@_ ]+$/.test(value))),
    mobile: yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required("mobile is required"),
    password: yup.string().required('password is required').min(6, 'password must be at least 6 characters').matches(/^(?![\s@!#$%^&*()_+={}[\]:";'<>?,./\\|`~])[A-Za-z\d@$!%*?&]{6,}$/, 'password in only space and spacle characters  is not valid '),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match'),
    address1: yup.string().required('address1 is required'),
    address2: yup.string().required('address2 is required'),
    pincode: yup.number().required('pincode is required')
});

export async function POST(request) {
    try {
        // Parse and validate the request payload
        const contentType = request.headers.get("content-type");
        let body = await (contentType && contentType.includes("application/json") ? request.json() : {});
        await Schema.validate(body);

        const { name, username, email, mobile, password, address1, address2 } = body;

        // Hash the password with bcrypt
        const saltRounds = 2;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        let pincode = parseInt(body.pincode);
        // Check if the user already exists
        const user_data = await prisma.users.findUnique({ where: { username } });

        if (!user_data) {
            // Create a new user in the database
            const user = await prisma.users.create({
                data: {
                    name,
                    username,
                    mobile,
                    email,
                    type: 'User',
                    password: hashedPassword,
                    pincode,
                    address_1: address1,
                    address_2: address2
                },
            });

            // Generate JWT for the new user
            const token = jwt.sign(
                { userId: user.id, username, mobile: user.mobile },
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
