import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
  appPreloader: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
  preloader: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    position: 'absolute',
    top: '0',
    width: '100vw',
    zIndex: 10,
  },
  preloaderExt: {
    alignItems: 'center',
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
  },
}))
