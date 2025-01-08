import { createMedia } from '@tamagui/react-native-media-driver'
import { createFont, createTamagui, createTokens } from 'tamagui'

const interFont = createFont({
  family: "Inter, Helvetica, Arial, sans-serif",
  size: {
    1: 12,
    2: 14,
    3: 15
  },
  lineHeight: {
    2: 22
  },
  weight: {
    1: '300',
    3: '600'
  },
  letterSpacing: {
    1: 0,
    2: -1
  },
  face: {
    300: { normal: 'InterLight', Italic: 'InterItalic' },
    600: { normal: 'InterBold' }
  }
})

const size = {
  0: 0,
  xsm: 1,
  sm: 2,
  md: 5,
  true: 5,
  lg: 10,
  xl: 15
}
export const tokens = createTokens({
  size,
  padding: { ...size },
  space: { 2: 2, true: 2, '-1': 5, '-2': -10 },
  radius: { 0: 0, 1: 3 },
  zIndex: { 0: 0, 1: 100, 2: 200 },
  color: {
    white: '#ffffff',
    black: '#000000',
    pink: 'pink',
    background: '#ccc'
  }
})

const config = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont
  },
  tokens,

  themes: {
    light: {
      background: '#fff',
      // backgroundHover: tokens.color.gray2,
      // backgroundPress: tokens.color.gray4,
      // backgroundFocus: tokens.color.gray5,
      // borderColor: tokens.color.gray4,
      // borderColorHover: tokens.color.gray6,
      // borderColorPress: tokens.color.gray12,
      // borderColorFocus: tokens.color.gray11,
      // color: tokens.color.gray10,
      // colorHover: tokens.color.gray9,
      // colorPress: tokens.color.gray8,
      // colorFocus: tokens.color.gray8,
      // shadowColor: tokens.color.grayA4,
      // shadowColorHover: tokens.color.grayA6,
      // shadowColorPress: tokens.color.grayA8,
      // shadowColorFocus: tokens.color.grayA8,
      // ...lightColors,
    },
    dark: {
      bg: tokens.color.black,
      color: tokens.color.white
    }
  },

  // For web-only, media queries work out of the box and you can avoid the
  // `createMedia` call here by passing the media object directly.
  // If you are going to target React Native, use `createMedia` (it's an identity
  // function on web so you can import it there without concern).
  // media: createMedia({
  //   sm: { maxWidth: 860 },
  //   gtSm: { minWidth: 860 + 1 },
  //   short: { maxHeight: 820 },
  //   hoverNone: { hover: 'none' },
  //   pointerCoarse: { pointer: 'coarse' },
  // }),

  shorthands: {
    px: 'paddingHorizontal',
    f: 'flex',
    m: 'margin',
    w: 'width'
  } as const,
})

type AppConfig = typeof config

// this will give you types for your components
// note - if using your own design system, put the package name here instead of tamagui
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig { }

  // if you want types for group styling props, define them like so:
  interface TypeOverride {
    groupNames(): 'a' | 'b' | 'c'
  }
}

export default config
