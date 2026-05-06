import _mongoose, { connect } from "mongoose";

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const DEFAULT_MONGODB_URI: string = MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function connectDB(dbUrl: string = DEFAULT_MONGODB_URI) {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = connect(dbUrl, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
