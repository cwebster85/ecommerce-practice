import mongoose from "mongoose";

export async function initMongoose() {
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    return mongoose.connect(encodeURI(process.env.MONGODB_URL));
}

