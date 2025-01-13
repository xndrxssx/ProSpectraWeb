// src/lib/global.d.ts
declare global {
    var prisma: PrismaClient | undefined;
    var _mongoClientPromise: Promise<MongoClient> | undefined;
  }
  
  export {};
  