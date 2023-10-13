import * as jwt from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

interface Params {
    id: string
}

export async function GET(request: NextRequest, { params: { id } }: { params: Params }) {
    const baseUrl = request.nextUrl.origin

    const token = jwt.sign({ invitationId: id, linkId: uuid() })

    return NextResponse.json({
        shareLink: `${baseUrl}/invitation/${token}`
    })
}