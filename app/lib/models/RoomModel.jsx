import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    roomType: { type: String, required: true },
    roomDescription: { type: String, required: true },
    roomPrice: { type: Number, required: true },
    roomImageUrl: { type: String, required: true },
    roomCapacity: { type: Number, required: true },
});


export const RoomModel = mongoose.models.Room || mongoose.model("Room", roomSchema);