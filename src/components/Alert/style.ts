import { createStyles } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  alert: {
    bottom: '1%',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    right: '1%',
    zIndex: 1,
  },
}))
