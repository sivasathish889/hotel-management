import { UserModel } from "@/app/lib/models/UserModel";
import bcrypt from "bcrypt";

export async function POST(request) {
    const { username, password, passwordConfirm, email, phone } = await request.json();
    if (password !== passwordConfirm) {
        return new Response(JSON.stringify({ message: 'Passwords does not match', success: false }), {
            status: 400,
        });
    }
    if (!username || !password || !email || !phone, !passwordConfirm) {
        return new Response(JSON.stringify({ message: 'All fields are required', success: false }), {
            status: 400,
        });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
        return new Response(JSON.stringify({ message: 'Email already exists', success: false }), {
            status: 409,
        });
    }
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = new UserModel({ username, password: hashPassword, email, phoneNumber: phone });
    await newUser.save()
    return new Response(JSON.stringify({ message: 'Registration successful', success: true }), {
        status: 201,
    });

}