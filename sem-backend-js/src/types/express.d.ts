import { MongoClient } from 'mongodb';

declare global {
  namespace Express {
    interface Locals {
      mongoClient: MongoClient;
    }
  }
}