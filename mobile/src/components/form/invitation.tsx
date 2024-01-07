import { Button, Center, FormControl, Icon, Image, Input, Pressable, VStack } from 'native-base'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ZodError, z } from 'zod'
import { ExpoIcon } from '../../components/ui/expo-icon'
import { InputIcon } from '../../components/ui/input-icon'
import { maxSizeImage, selectImage } from '../../utils/image'

const invitationSchema = z.object({
  imageUri: z.string().nullable(),
  name: z.string().min(1, 'Nome é obrigatório'),
  eventName: z.string().min(1, 'Evento é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória').regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
})

export type InvitationFormData = z.infer<typeof invitationSchema>

interface InvitationFormProps {
  onSubmit?: (data: InvitationFormData) => Promise<void> | void
  submitButtonText: string
  defaultValues?: InvitationFormData
}

export function InvitationForm({ onSubmit, submitButtonText, defaultValues }: InvitationFormProps) {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false)

  const form = useForm<InvitationFormData>({
    defaultValues: defaultValues ?? {
      imageUri: '',
      name: '',
      eventName: '',
      address: '',
      date: '',
      time: '',
    },
  })

  async function handleSubmit(data: InvitationFormData) {
    setIsLoadingSubmit(true)
    try {
      console.log(data)
      invitationSchema.parse(data)
      await onSubmit?.(data)
    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((issue) => {
          form.setError(issue.path?.join('.') as any, { type: 'manual', message: issue.message })
        })
      }
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  return (
    <VStack
      padding={8}
      space={4}
    >
      <Controller
        control={form.control}
        name='imageUri'
        render={({ field: { onChange, value } }) => {
          async function handleSelectImage() {
            const asset = await selectImage()
            if (!asset) return
            const uri = await maxSizeImage({
              imageUri: asset.uri,
              width: asset.width,
              height: asset.height,
              maxHeight: 1024,
              maxWidth: 1024,
            })
            onChange(uri)
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
                  source={{ uri: value }}
                />
              )}
              {!value && (
                <Center
                  bgColor='muted.200'
                  borderStyle='dashed'
                  borderWidth={1}
                  borderColor='muted.400'
                  _dark={{
                    bgColor: 'muted.800',
                    borderColor: 'muted.700',
                  }}
                  borderRadius={8}
                  size={200}
                  w='full'
                >
                  <Icon
                    as={<ExpoIcon name='Entypo/image' />}
                    size={100}
                    color='muted.400'
                    _dark={{
                      color: 'muted.500',
                    }}
                  />
                </Center>
              )}
            </Pressable>
          )
        }}
      />

      <Controller
        control={form.control}
        name='eventName'
        render={({ field: { onChange, ...restField }, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error}>
            <Input
              placeholder='Evento'
              InputLeftElement={<InputIcon name='Feather/award' />}
              onChangeText={onChange}
              {...restField}
            />
            <FormControl.ErrorMessage>
              {fieldState.error?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
      />
      <Controller
        control={form.control}
        name='name'
        render={({ field: { onChange, ...restField }, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error}>
            <Input
              placeholder='Nome'
              InputLeftElement={<InputIcon name='Feather/user' />}
              {...restField}
              onChangeText={onChange}
            />
            <FormControl.ErrorMessage>
              {fieldState.error?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
      />
      <Controller
        control={form.control}
        name='address'
        render={({ field: { onChange, ...restField }, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error}>
            <Input
              placeholder='Endereço'
              InputLeftElement={<InputIcon name='Feather/map-pin' />}
              onChangeText={onChange}
              {...restField}
            />
            <FormControl.ErrorMessage>
              {fieldState.error?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
      />
      <Controller
        control={form.control}
        name='date'
        render={({ field: { onChange, ...restField }, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error}>
            <Input
              placeholder='Data'
              keyboardType='numeric'
              InputLeftElement={<InputIcon name='Feather/calendar' />}
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
            <FormControl.ErrorMessage>
              {fieldState.error?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
      />
      <Controller
        control={form.control}
        name='time'
        render={({ field: { onChange, ...restField }, fieldState }) => (
          <FormControl isInvalid={!!fieldState.error}>
            <Input
              placeholder='HH:MM'
              keyboardType='numeric'
              InputLeftElement={<InputIcon name='Feather/clock' />}
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
            <FormControl.ErrorMessage>
              {fieldState.error?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
      />
      <Button
        isLoading={isLoadingSubmit}
        onPress={form.handleSubmit(handleSubmit)}
      >{submitButtonText}</Button>
    </VStack>
  )
}