import * as ImageManipulator from 'expo-image-manipulator'
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

async function resizeImage({ imageUri, width, height }: {
    imageUri: string
    width: number
    height: number
}): Promise<string> {
    const { uri } = await ImageManipulator.manipulateAsync(imageUri, [{
        resize: {
            width,
            height
        }
    }])
    return uri
}

export async function maxSizeImage({ imageUri, width, height, maxWidth, maxHeight }: {
    imageUri: string
    width: number
    height: number
    maxWidth: number
    maxHeight: number
}): Promise<string> {
    const imageResolution = width * height
    const maxResolution = maxWidth * maxHeight
    if (imageResolution <= maxResolution) return imageUri
    const ratio = width / height
    if (width > maxWidth) {
        width = maxWidth
        height = width / ratio
    }
    if (height > maxHeight) {
        height = maxHeight
        width = height * ratio
    }
    return await resizeImage({ imageUri, width, height })
}