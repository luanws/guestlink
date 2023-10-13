'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Guest } from '@/models/guest'
import * as InvitationService from '@/services/invitation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, Loader2, MinusIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  guestName: z.string({ required_error: 'O nome é obrigatório' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(255, 'O nome deve ter no máximo 255 caracteres')
    .regex(/^([a-zA-ZÀ-ú]+)\s+([a-zA-ZÀ-ú]+(\s+)?)+$/g, 'Digite seu nome completo'),
  companions: z.array(
    z.string({ required_error: 'O nome é obrigatório' })
      .min(2, 'O nome deve ter pelo menos 2 caracteres')
      .max(255, 'O nome deve ter no máximo 255 caracteres')
      .regex(/^([a-zA-ZÀ-ú]+)\s+([a-zA-ZÀ-ú]+(\s+)?)+$/, 'Digite o nome completo do acompanhante')
  ).optional(),
})

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ')
}

interface InvitationGuestFormProps {
  invitationId: string
  guestId: string
  guest?: Guest
}

export function InvitationGuestForm({ invitationId, guestId, guest }: InvitationGuestFormProps) {
  const [numberOfCompanions, setNumberOfCompanions] = useState<number>(guest?.companions?.length ?? 0)
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: guest?.name ?? '',
      companions: guest?.companions ?? [],
    }
  })

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitLoading(true)
    try {
      const guestName = normalizeName(data.guestName)
      const companions = data.companions?.slice(0, numberOfCompanions).map(normalizeName) ?? []
      const guest: Guest = { name: guestName, companions }
      await InvitationService.setGuest({ invitationId, guest, guestId })
      router.push('/invitation/success')
    } finally {
      setIsSubmitLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-6'
        onSubmit={form.handleSubmit(handleSubmit)}
      >

        <FormField
          control={form.control}
          name='guestName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  placeholder='Digite seu nome completo aqui...'
                  autoCapitalize='words'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>
          Quantos acompanhantes vão com você?
        </FormLabel>
        <div className='flex items-center justify-center gap-12'>
          <Button
            type='button'
            variant='secondary'
            disabled={numberOfCompanions === 0}
            onClick={() => {
              if (numberOfCompanions > 0) {
                setNumberOfCompanions(numberOfCompanions - 1)
              }
            }}
          >
            <MinusIcon />
          </Button>
          <div className='text-3xl'>
            {numberOfCompanions}
          </div>
          <Button
            type='button'
            variant='secondary'
            onClick={() => setNumberOfCompanions(numberOfCompanions + 1)}
          >
            <PlusIcon />
          </Button>
        </div>

        <div className='flex flex-col gap-4'>
          {Array.from({ length: numberOfCompanions }).map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`companions[${index}]` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do acompanhante {index + 1}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Digite o nome do acompanhante aqui...'
                      autoCapitalize='words'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button
          className='w-full flex items-center justify-center gap-2'
          disabled={isSubmitLoading}
          type='submit'
        >
          {isSubmitLoading && <Loader2 className='h-4 w-4 animate-spin' />}
          {!isSubmitLoading && <CheckIcon className='h-4 w-4' />}
          Confirmar presença
        </Button>

      </form>
    </Form>
  )
}