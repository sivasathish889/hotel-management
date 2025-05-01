import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    roomType: { type: String, required: true },
    roomCapacity: { type: Number, required: true },
    roomPrice: { type: Number, required: true },
    roomDescription: { type: String, required: true },
    roomAmenities: {
        wifi: { type: Boolean },
        tv: { type: Boolean },
        aircon: { type: Boolean },
        minibar: { type: Boolean },
        balcony: { type: Boolean },
        bathtub: { type: Boolean }
    },
    roomLocation: { type: String, required: true },
    roomStatus: { type: String, required: true },
    roomRating: { type: Number, required: true },
    roomImageUrl: { type: [String], required: true },
});


export const RoomModel = mongoose.models.Room || mongoose.model("Room", roomSchema);