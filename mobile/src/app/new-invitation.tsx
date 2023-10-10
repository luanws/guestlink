import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Button, Center, Icon, Image, Input, Pressable, ScrollView, VStack } from 'native-base'
import React, { useState } from 'react'
import { ExpoIcon } from '../components/ui/expo-icon'

export default function () {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)

  async function handleSelectImage() {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!granted) return
    const { assets } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!assets?.length) return
    const [asset] = assets
    setImage(asset)
  }

  return (
    <>
      <ScrollView>
        <VStack
          padding={4}
          space={4}
        >
          <Pressable
            onPress={handleSelectImage}
            _pressed={{
              opacity: 0.7,
            }}
          >
            {image && (
              <Image
                rounded={8}
                size={200}
                w='full'
                alt='Foto'
                source={{ uri: image?.uri }}
              />
            )}
            {!image && (
              <Center>
                <Icon
                  as={<ExpoIcon name='Entypo/image' />}
                  size={200}
                  w='full'
                  color='muted.400'
                />
              </Center>
            )}
          </Pressable>
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