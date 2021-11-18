import {
  NextFetchEvent,
  NextRequest,
  NextResponse
} from 'next/server'

export function middleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  console.log(123)
  return NextResponse.next()
}
