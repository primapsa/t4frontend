import { createStyles } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  box: {
    margin: '0 auto',
    maxWidth: '300px',
  },
  promocode: {
    padding: '10px',
    [theme.fn.smallerThan('500')]: {
      width: '250px',
    },
    width: '400px',
  },
  promocode__inner: {
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  promocode__title: {
    fontWeight: 'bolder',
  },
}))
