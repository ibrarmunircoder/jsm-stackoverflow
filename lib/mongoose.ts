import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (process.env.MONGODB_URL) {
    return console.log('MISSING MONGODB_URL');
  }

  if (isConnected) {
    return console.log('MongoDb is already connected');
  }

  try {
    const db = await mongoose.connect(process.env.NODE_ENV, {
      dbName: 'devflow',
    });
    isConnected = db.connections[0].readyState === 1;
    console.log(
      `Successfully connected to the host ${mongoose.connection.host}`
    );
  } catch (error) {}
};
