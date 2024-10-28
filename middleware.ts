import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/menu'];
const publicRoutes = ['/login'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith('/api/refresh-token')) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute = publicRoutes.includes(path);

  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const accessToken = cookieStore.get('accessToken')?.value;

  // Якщо це захищений маршрут і немає refreshToken, перенаправляємо на /login
  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Якщо закінчився accessToken і є refreshToken, перенаправляємо на /api/refresh-token
  if (!accessToken && refreshToken) {
    return NextResponse.redirect(new URL('/api/refresh-token', req.nextUrl));
  }

  // Якщо це публічний маршрут і є refreshToken, перенаправляємо на /menu
  if (isPublicRoute && refreshToken) {
    return NextResponse.redirect(new URL('/menu', req.nextUrl));
  }

  return NextResponse.next();
}
