import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getSession } from "@/utils/session/sessionUtils";
 
export async function proxy(request: NextRequest) {
	const session = await getSession();
	// If the user is not logged in, so there is no session they get redirected to the login page
	if (!session) {
 		 return NextResponse.redirect(new URL('/login', request.url))
	};
}
 
export const config = {
  matcher: '/dashboard/:path*',
}
