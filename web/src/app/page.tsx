import Image from 'next/image'
import Link from 'next/link'

export default async function () {
  return (
    <div className='w-screen min-h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center max-w-xl p-8 rounded-md gap-8'>
        <Title />
        <InfoText />
        <DownloadApp />
      </div>
    </div>
  )
}

function Title() {
  return (
    <h1 className='text-4xl font-bold'>
      Guestlink
    </h1>
  )
}

function InfoText() {
  return (
    <div>
      Guestlink é um aplicativo de criação e gerenciamento de convites para eventos.
    </div>
  )
}

function DownloadApp() {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <Image
        src={'images/android-app-qrcode.svg'}
        width={200}
        height={200}
        alt='QR Code'
      />
      <Link href='https://expo.dev/accounts/luanws/projects/guestlink/builds/f82430db-7401-43a2-a27b-cf99ce0e5f87'>
        <Image
          src={'images/download-app-android-google-play.svg'}
          width={200}
          height={200}
          alt='Google Play'
        />
      </Link>
    </div>
  )
}