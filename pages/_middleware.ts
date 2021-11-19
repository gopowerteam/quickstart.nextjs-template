import {
  NextFetchEvent,
  NextRequest,
  NextResponse
} from 'next/server'

export function middleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  if (!req.page.name) {
    return NextResponse.next()
  }

  console.log(req.cookies, 'test')

  console.log(111, req.page, ev)
}
