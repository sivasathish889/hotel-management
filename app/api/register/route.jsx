import { UserModel } from "@/app/lib/models/UserModel";

export async function POST(request) {
    const {username, password, email, phoneNumber} = await request.json();
    if(!username || !password || !email || !phoneNumber) {
        return new Response(JSON.stringify({message: 'All fields are required'}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    const user = await UserModel.findOne({username});
    if (user) {
        return new Response(JSON.stringify({ message: 'User already exists' }), {
            status: 409,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const newUser = new UserModel({ username, password, email, phoneNumber });
    await newUser.save()
    return new Response(JSON.stringify({ message: 'Registration successful' }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });

}