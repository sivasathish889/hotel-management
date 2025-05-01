import { RoomModel } from '@/app/lib/models/RoomModel';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    const { id } = params;

    try {
        const data = await req.json();
        console.log('Received Data:', data);

        // Validate input data
        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        // Update the room in the database
        const updatedRoom = await RoomModel.findByIdAndUpdate(
            id,
            {
                roomNumber: data.number,
                roomType: data.type,
                roomCapacity: data.capacity,
                roomPrice: data.price,
                roomStatus: data.status,
                roomDescription: data.description,
                roomAmenities: data.amenities, // Ensure amenities is an object
            },
            { new: true } // Return the updated document
        );

        if (!updatedRoom) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        return NextResponse.json(updatedRoom, { status: 200 });
    } catch (error) {
        console.error('Error updating room:', error);
        return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
    }
}