import { UserModel } from "@/app/lib/models/UserModel";
import { compareSync } from "bcrypt";

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Please fill the fields", success: false }), { status: 400 });
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            const comparePass = compareSync(password, user.password);
            if (comparePass) {
                return new Response(JSON.stringify({ message: 'Login successful', user, success: true }), {
                    status: 200,
                });
            }
            return new Response(JSON.stringify({ message: "Incorrect Password", success: false }), {
                status: 401,
            });
        }

        return new Response(JSON.stringify({ message: 'Invalid Email', success: false }), {
            status: 401,
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message, success: false }), {
            status: 500,
        });
    }
}