import { createStyles } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  mirror: {
    height: '500px',
  },
  root: {
    [theme.fn.smallerThan('370')]: {
      width: '250px',
    },
    width: '100%',
  },
}))
