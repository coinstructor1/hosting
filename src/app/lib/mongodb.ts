// lib/dbConnect.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Bitte definiere die MONGODB_URI Umgebungsvariable in .env.local'
  );
}

interface MongooseConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var __mongooseConnectionCache: MongooseConnectionCache;
}

export { };

let cached = globalThis.__mongooseConnectionCache;

if (!cached) {
  cached = globalThis.__mongooseConnectionCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    // Verwende die gecachte Verbindung
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Erstelle eine neue Verbindungs-Promise
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  // Warte auf die Verbindung und cache sie
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
