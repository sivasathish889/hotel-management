import mongoose from 'mongoose';

const db = async () => {

    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (error) {
        console.log("Db error")
    }
}

export default db;