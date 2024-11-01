import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteSesssion, refreshSession } from '../../login/requests';

export async function GET(req: NextRequest) {
  return await handleRefreshToken(req);
}

export async function POST(req: NextRequest) {
  return await handleRefreshToken(req);
}

async function handleRefreshToken(req: NextRequest) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const token = await refreshSession(refreshToken);
    const accessExpiresAt = new Date(Date.now() + 50 * 60 * 1000);
    // const refreshExpiresAt = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000);

    if (token) {
      cookies().set('accessToken', token.accessToken, {
        httpOnly: true,
        secure: true,
        expires: accessExpiresAt,
        sameSite: 'lax',
        path: '/',
      });
      cookies().set('role', token.role, {
        httpOnly: true,
        secure: true,
        expires: accessExpiresAt,
        sameSite: 'lax',
        path: '/',
      });
    }

    return NextResponse.redirect(req.nextUrl);
    // return NextResponse.redirect(new URL('/menu', req.nextUrl));
  } catch {
    await deleteSesssion();
  }
}
