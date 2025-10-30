import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/", "/login", "/registro"]

  // Verificar si es una ruta pública
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Obtener token del localStorage (en middleware no tenemos acceso directo)
  // Por eso usamos cookies como alternativa
  const token = request.cookies.get("ec_token")?.value

  // Si no hay token y es una ruta protegida, redirigir a login
  if (!token && (pathname.startsWith("/cliente") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
