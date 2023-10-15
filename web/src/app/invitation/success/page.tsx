'use client'

import successAnimationData from '@/assets/lottie/success.json'
import Lottie from 'react-lottie'

export default function () {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center justify-center p-8 max-w-lg '>
        <Lottie
          options={{
            loop: false,
            animationData: successAnimationData,
            autoplay: true,
          }}
          width={128}
          height={128}
        />
        <h1 className='text-xl text-center'>
          Presença confirmada com sucesso!
        </h1>
        <div className='mt-8'>
          <p className='text-center text-muted-foreground'>
            Caso precise alterar sua confirmação, basta acessar o mesmo link que você recebeu.
          </p>
        </div>
      </div>
    </div>
  )
}