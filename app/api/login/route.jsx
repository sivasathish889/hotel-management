import { UserModel } from "@/app/lib/models/UserModel";

export async function POST(request) {
    const { username, password } = await request.json();
    console.log(username, password);
    // Simulate a login process
    const user = await UserModel.findOne({ username, password });
    if (user) {
        return new Response(JSON.stringify({ message: 'Login successful' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}