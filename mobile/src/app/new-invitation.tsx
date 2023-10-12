import { router } from 'expo-router'
import { Button, Center, Icon, Image, Input, Pressable, ScrollView, Toast, VStack } from 'native-base'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ZodError, z } from 'zod'
import { ExpoIcon } from '../components/ui/expo-icon'
import { InputIcon } from '../components/ui/input-icon'
import { InvitationService } from '../services/invitation'
import { selectImage } from '../utils/image'

const newInvitationSchema = z.object({
  imageBase64: z.string().nullable(),
  name: z.string().min(1, 'Nome é obrigatório'),
  eventName: z.string().min(1, 'Evento é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória').regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
})

type NewInvitationForm = z.infer<typeof newInvitationSchema>

export default function () {
  const form = useForm<NewInvitationForm>({
    defaultValues: {
      name: '',
      eventName: '',
      imageBase64: '',
    },
  })

  async function handleSubmit(data: NewInvitationForm) {
    try {
      newInvitationSchema.parse(data)
      await InvitationService.createInvitation(data)
      router.back()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues.map(issue => issue.message).join('\n')
        Toast.show({
          title: 'Erro',
          backgroundColor: 'danger.500',
          description: errorMessage,
          duration: 5000,
        })
      }
    }
  }

  return (
    <>
      <ScrollView>
        <VStack
          padding={4}
          space={4}
        >
          <Controller
            control={form.control}
            name='imageBase64'
            render={({ field: { onChange, value } }) => {
              async function handleSelectImage() {
                const asset = await selectImage()
                if (!asset) return
                const { base64 } = asset
                onChange(base64)
              }

              return (
                <Pressable
                  onPress={handleSelectImage}
                  _pressed={{
                    opacity: 0.7,
                  }}
                >
                  {value && (
                    <Image
                      rounded={8}
                      size={200}
                      w='full'
                      alt='Foto'
                      source={{ uri: `data:image/png;base64,${value}` }}
                    />
                  )}
                  {!value && (
                    <Center
                      bgColor='muted.200'
                      borderStyle='dashed'
                      borderWidth={1}
                      borderColor='muted.400'
                      borderRadius={8}
                      size={200}
                      w='full'
                    >
                      <Icon
                        as={<ExpoIcon name='Entypo/image' />}
                        size={100}
                        color='muted.400'
                      />
                    </Center>
                  )}
                </Pressable>
              )
            }}
          />

          <Controller
            control={form.control}
            name='name'
            render={({ field: { onChange, ...restField } }) => (
              <Input
                placeholder='Nome'
                InputLeftElement={<InputIcon name='MaterialIcons/person' />}
                {...restField}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={form.control}
            name='eventName'
            render={({ field: { onChange, ...restField } }) => (
              <Input
                placeholder='Evento'
                InputLeftElement={<InputIcon name='MaterialIcons/event' />}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={form.control}
            name='address'
            render={({ field: { onChange, ...restField } }) => (
              <Input
                placeholder='Endereço'
                InputLeftElement={<InputIcon name='FontAwesome5/map-marker-alt' />}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={form.control}
            name='date'
            render={({ field: { onChange, ...restField } }) => (
              <Input
                placeholder='Data'
                keyboardType='numeric'
                InputLeftElement={<InputIcon name='MaterialIcons/calendar-today' />}
                {...restField}
                onChangeText={text => {
                  const textWithoutMask = text.replace(/\D/g, '')
                  const parts = [
                    textWithoutMask.substring(0, 2),
                    textWithoutMask.substring(2, 4),
                    textWithoutMask.substring(4, 8)
                  ].filter(Boolean)
                  const maskedText = parts.join('/')
                  onChange(maskedText)
                }}
              />
            )}
          />
          <Controller
            control={form.control}
            name='time'
            render={({ field: { onChange, ...restField } }) => (
              <Input
                placeholder='HH:MM'
                keyboardType='numeric'
                InputLeftElement={<InputIcon name='MaterialIcons/access-time' />}
                {...restField}
                onChangeText={text => {
                  const textWithoutMask = text.replace(/\D/g, '')
                  const parts = [
                    textWithoutMask.substring(0, 2),
                    textWithoutMask.substring(2, 4),
                  ].filter(Boolean)
                  const maskedText = parts.join(':')
                  onChange(maskedText)
                }}
              />
            )}
          />
          <Button
            onPress={form.handleSubmit(handleSubmit)}
          >Enviar</Button>
        </VStack>
      </ScrollView>
    </>
  )
}