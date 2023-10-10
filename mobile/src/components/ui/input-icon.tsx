import { Icon } from 'native-base'
import { ExpoIcon, ExpoIconName } from './expo-icon'

interface InputIconProps {
  name: ExpoIconName
}

export function InputIcon({ name }: InputIconProps) {
  return (
    <Icon
      as={<ExpoIcon name={name} />}
      color='muted.400'
      size={5}
      ml='2'
    />
  )
}