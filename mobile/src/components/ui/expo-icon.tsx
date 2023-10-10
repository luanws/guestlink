import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
} from '@expo/vector-icons'
import React from 'react'
import { StyleProp, TextStyle } from 'react-native'

type AntDesignName = keyof typeof AntDesign.glyphMap
type AntDesignNameWithPrefix = `AntDesign/${AntDesignName}`

type EntypoName = keyof typeof Entypo.glyphMap
type EntypoNameWithPrefix = `Entypo/${EntypoName}`

type EvilIconsName = keyof typeof EvilIcons.glyphMap
type EvilIconsNameWithPrefix = `EvilIcons/${EvilIconsName}`

type FeatherName = keyof typeof Feather.glyphMap
type FeatherNameWithPrefix = `Feather/${FeatherName}`

type FontAwesomeName = keyof typeof FontAwesome.glyphMap
type FontAwesomeNameWithPrefix = `FontAwesome/${FontAwesomeName}`

type FontistoName = keyof typeof Fontisto.glyphMap
type FontistoNameWithPrefix = `Fontisto/${FontistoName}`

type FoundationName = keyof typeof Foundation.glyphMap
type FoundationNameWithPrefix = `Foundation/${FoundationName}`

type IoniconsName = keyof typeof Ionicons.glyphMap
type IoniconsNameWithPrefix = `Ionicons/${IoniconsName}`

type MaterialCommunityIconsName = keyof typeof MaterialCommunityIcons.glyphMap
type MaterialCommunityIconsNameWithPrefix = `MaterialCommunityIcons/${MaterialCommunityIconsName}`

type MaterialIconsName = keyof typeof MaterialIcons.glyphMap
type MaterialIconsNameWithPrefix = `MaterialIcons/${MaterialIconsName}`

type OcticonsName = keyof typeof Octicons.glyphMap
type OcticonsNameWithPrefix = `Octicons/${OcticonsName}`

type SimpleLineIconsName = keyof typeof SimpleLineIcons.glyphMap
type SimpleLineIconsNameWithPrefix = `SimpleLineIcons/${SimpleLineIconsName}`

type ZocialName = keyof typeof Zocial.glyphMap
type ZocialNameWithPrefix = `Zocial/${ZocialName}`


interface ExpoIconProps {
  name:
  | AntDesignNameWithPrefix
  | EntypoNameWithPrefix
  | EvilIconsNameWithPrefix
  | FeatherNameWithPrefix
  | FontAwesomeNameWithPrefix
  | FontistoNameWithPrefix
  | FoundationNameWithPrefix
  | IoniconsNameWithPrefix
  | MaterialCommunityIconsNameWithPrefix
  | MaterialIconsNameWithPrefix
  | OcticonsNameWithPrefix
  | SimpleLineIconsNameWithPrefix
  | ZocialNameWithPrefix
  size?: number
  color?: string
  style?: StyleProp<TextStyle>
}

const getIcon = (icon: string, size: number, color: string, style: StyleProp<TextStyle>) => {
  const [source, name] = icon.split('/').map(x => x as any)
  switch (source) {
    case 'AntDesign':
      return <AntDesign style={style} name={name} size={size} color={color} />
    case 'Entypo':
      return <Entypo style={style} name={name} size={size} color={color} />
    case 'EvilIcons':
      return <EvilIcons style={style} name={name} size={size} color={color} />
    case 'Feather':
      return <Feather style={style} name={name} size={size} color={color} />
    case 'Fontisto':
      return <Fontisto style={style} name={name} size={size} color={color} />
    case 'FontAwesome':
      return <FontAwesome style={style} name={name} size={size} color={color} />
    case 'Foundation':
      return <Foundation style={style} name={name} size={size} color={color} />
    case 'Ionicons':
      return <Ionicons style={style} name={name} size={size} color={color} />
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons style={style} name={name} size={size} color={color} />
    case 'MaterialIcons':
      return <MaterialIcons style={style} name={name} size={size} color={color} />
    case 'Octicons':
      return <Octicons style={style} name={name} size={size} color={color} />
    case 'SimpleLineIcons':
      return <SimpleLineIcons style={style} name={name} size={size} color={color} />
    case 'Zocial':
      return <Zocial style={style} name={name} size={size} color={color} />
    default:
      return null
  }
}

export function ExpoIcon(props: ExpoIconProps) {
  const { name, style } = props
  const size = props.size ?? 24
  const color = props.color ?? 'black'
  if (typeof name === 'string') {
    return getIcon(name, size, color, style)
  } else {
    return name
  }
}