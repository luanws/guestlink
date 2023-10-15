import { decrypt } from '@/lib/crypto'
import * as jwt from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

interface Params {
    invitationAuthorizationKey: string
}

export async function GET(request: NextRequest, { params: { invitationAuthorizationKey } }: { params: Params }) {
    const id = decrypt(invitationAuthorizationKey)

    const baseUrl = request.nextUrl.origin
    const guestId = request.nextUrl.searchParams.get('guestId')

    const linkId = guestId ?? uuid()

    const token = jwt.sign({ invitationId: id, linkId })

    return NextResponse.json({
        shareLink: `${baseUrl}/invitation/${token}`
    })
}