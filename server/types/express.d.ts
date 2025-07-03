// server/types/express.d.ts
interface UserPayload {
  id: number;
  email: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}