import { decrypt } from '@/lib/crypto'
import * as jwt from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

interface Params {
    invitationAuthorizationKey: string
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const { invitationAuthorizationKey } = params

    const id = decrypt(invitationAuthorizationKey)

    const baseUrl = request.nextUrl.origin
    const guestId = request.nextUrl.searchParams.get('guestId')
    const guestLimit = request.nextUrl.searchParams.get('guestLimit')

    const linkId = guestId ?? uuid()

    const token = jwt.sign({
        invitationId: id,
        linkId,
        guestLimit: guestLimit ? parseInt(guestLimit) : undefined,
    })

    return NextResponse.json({
        shareLink: `${baseUrl}/invitation/${token}`
    })
}