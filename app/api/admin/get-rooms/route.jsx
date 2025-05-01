import { RoomModel } from "@/app/lib/models/RoomModel";

export async function GET(req) {
    try {
        const rooms = await RoomModel.find();
        return new Response(JSON.stringify(rooms), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch rooms" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}