import { MongoClient } from 'mongodb';

const { MONGO_URI, MONGO_DB } = process.env;

const client = new MongoClient(MONGO_URI);

export const db = client.db(MONGO_DB);
