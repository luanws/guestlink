import { MaterialIcons } from '@expo/vector-icons'
import { Button, Icon, Image, Input, ScrollView, VStack } from 'native-base'
import React from 'react'

export default function () {
  return (
    <>
      <ScrollView>
        <VStack
          padding={4}
          space={4}
        >
          <Image
            rounded={8}
            size={200}
            w='full'
            alt='Foto'
            source={{
              uri: 'https://wallpaperaccess.com/full/317501.jpg',
            }}
          />
          <Input
            placeholder='Nome'
            InputLeftElement={<Icon as={<MaterialIcons name='person' />} size={5} ml='2' color='muted.400' />}
          />
          <Input
            placeholder='Nome do evento'
            InputLeftElement={<Icon as={<MaterialIcons name='event' />} size={5} ml='2' color='muted.400' />}
          />
          <Button>Enviar</Button>
        </VStack>
      </ScrollView>
    </>
  )
}