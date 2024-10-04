import mongoose from 'mongoose'

let isConnected = false //check if mongoose is connected

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGOOSE_URI) return console.log('MONGOOSE_URI not found');
    
    if (isConnected) return console.log('Already connected to database');
    
    try {
        
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'error connecting to database';
        throw new Error(errMsg)
    }
}