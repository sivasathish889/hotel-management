import { RoomModel } from '@/app/lib/models/RoomModel';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'Room ID is required' }, { status: 400 });
    }

    try {
        const room = await RoomModel.findById(id);

        if (!room) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        return NextResponse.json(room, { status: 200 });
    } catch (error) {
        console.error('Error fetching room:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}