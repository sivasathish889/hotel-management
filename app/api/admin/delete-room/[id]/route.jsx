import { RoomModel } from '@/app/lib/models/RoomModel';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'Room ID is required' }, { status: 400 });
    }

    try {
        const deletedRoom = await RoomModel.findByIdAndDelete(id);

        if (!deletedRoom) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}