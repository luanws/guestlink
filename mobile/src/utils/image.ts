import * as ImagePicker from 'expo-image-picker'

export async function selectImage(options?: ImagePicker.ImagePickerOptions): Promise<ImagePicker.ImagePickerAsset | undefined> {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (!granted) return
  const { assets } = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
    ...options
  })
  if (!assets?.length) return
  const [asset] = assets
  return asset
}