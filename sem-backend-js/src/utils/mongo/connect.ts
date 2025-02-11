import { MongoClient } from "mongodb";

const mongoURI = "mongodb://127.0.0.1:27017/";

export const initMongo = async() => {
    const client = new MongoClient(mongoURI);
    await client.connect();

    console.log('Connected to MongoDB');
    
    return client;
}