import { RoomModel } from '@/app/lib/models/RoomModel';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const topRooms = await RoomModel.find({})
            .sort({ roomRating: -1 }) // Sort by `roomRating` in descending order
            .limit(5); // Limit to 5 results

        return NextResponse.json(topRooms, { status: 200 });
    } catch (error) {
        console.error('Error fetching top rooms:', error);
        return NextResponse.json({ error: 'Failed to fetch room data' }, { status: 500 });
    }
}