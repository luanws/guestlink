'use client'

import successAnimationData from '@/assets/lottie/success.json'
import Lottie from 'react-lottie'

export default function () {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <Lottie
        options={{
          loop: false,
          animationData: successAnimationData,
          autoplay: true,
        }}
        width={128}
        height={128}
      />
      <h1 className='text-xl'>
        Presença confirmada com sucesso!
      </h1>
    </div>
  )
}