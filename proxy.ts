import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/", "/login", "/registro"]
  
  // Obtener token de las cookies
  const token = request.cookies.get("ec_token")?.value

  // Nota: no redirigimos automáticamente desde /login aquí. Dejar que la
  // página de login en el cliente decida la redirección evita problemas cuando
  // quedan cookies residuales o cuando se necesita validar el token.

  // Verificar si es una ruta pública
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Si no hay token y es una ruta protegida, redirigir a login
  if (!token && (pathname.startsWith("/cliente") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}