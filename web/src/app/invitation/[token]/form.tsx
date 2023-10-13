'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  guestName: z.string().min(2).max(255),
  companions: z.array(z.string().min(2).max(255)),
})

export function InvitationGuestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function handleSubmit(data: z.infer<typeof formSchema>) {

  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name='guestName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Digite seu nome aqui...'
                    autoCapitalize='words'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}