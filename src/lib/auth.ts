import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
}

export async function getAuthUser(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return null;
    }

    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export async function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    const userId = await getAuthUser(req);
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req, userId);
  };
}
