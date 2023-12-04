import { rem } from '@mantine/core'

export const appTheme: any = {
  breakpoints: {
    lg: '74em', // 1216
    lm: '52em', // 832
    md: '64em', // 1024
    sm: '48em', //768
    xl: '90em',
    xs: '30em', // 480
  },
  fontFamily: 'Inter, sans-serif',
  globalStyles: (theme: Object) => ({
    '.active': {
      color: `#5E96FC`,
    },
    body: {
      backgroundColor: '#F5F5F5',
      boxSizing: 'border-box',
      position: 'relative',
    },
    input: {
      '::placeholder': {
        fontSize: rem(14),
      },
    },
  }),
  loader: 'oval',
}
export const styles = { maxWidth: '100%', padding: 0, width: '100%' }
