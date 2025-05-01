import { RoomModel } from '@/app/lib/models/RoomModel';
import { NextResponse } from 'next/server';
import formidable from 'formidable';
import { Readable } from 'stream';
import fs from 'fs/promises';

export const config = {
    api: {
        bodyParser: false,
    },
};

function convertNextRequestToNodeRequest(request) {
    const { headers, body } = request;
    const readableStream = Readable.from(body);
    return Object.assign(readableStream, {
        headers: Object.fromEntries(headers.entries()),
        method: request.method,
        url: request.url,
    });
}

async function parseForm(request) {
    const form = formidable({
        uploadDir: './public/uploads', // Directory to save uploaded files
        keepExtensions: true, // Keep file extensions
    });

    return new Promise((resolve, reject) => {
        form.parse(request, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
}

export async function POST(request) {
    try {
        const nodeRequest = convertNextRequestToNodeRequest(request);

        // Parse the form data
        const { fields, files } = await parseForm(nodeRequest);

        const { number, type, capacity, price, status, description, amenities, rating, location } = fields;


        if (!number || !type || !capacity || !price || !status || !description || !amenities || !rating || !location) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Handle amenities: parse only if it's a JSON string
        let parsedAmenities;
        try {
            parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid amenities format.' },
                { status: 400 }
            );
        }

        const imageFiles = files.images;
        const imageUrls = [];
        if (imageFiles) {
            const fileArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

            fileArray.forEach((file) => {
                const filePath = `/uploads/${file.newFilename}`;
                imageUrls.push(filePath);
            });
        }
        // Create a new room document
        const room = new RoomModel({
            roomNumber: number[0],
            roomType: type[0],
            roomCapacity: capacity[0],
            roomPrice: price[0],
            roomDescription: description[0],
            roomAmenities: parsedAmenities,
            roomLocation: location[0],
            roomStatus: status[0],
            roomRating: rating[0],
            roomImageUrl: imageUrls,
        });

        await room.save();

        return NextResponse.json(
            { message: 'Room added successfully.', room },
            { status: 201 }
        );
    } catch (error) {
        console.log(error)
        // return NextResponse.json(
        //     { error: error },
        //     { status: 500 }
        // );
    }
}