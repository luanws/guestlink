import { NextRequest, NextResponse } from 'next/server'

interface Params {
  id: string
}

export async function GET(request: NextRequest, { params: { id } }: { params: Params }) {
  const baseUrl = request.nextUrl.origin

  return NextResponse.json({
    shareLink: `${baseUrl}/invitation/${id}`
  })
}