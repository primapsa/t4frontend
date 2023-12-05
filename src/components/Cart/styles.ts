import { createStyles } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  center: {
    alignItems: 'start',
    display: 'flex',
    [theme.fn.smallerThan('sm')]: {
      alignItems: 'center',
      flexDirection: 'column',
      padding: '0 10px',
    },
  },
  payblock: {
    flexDirection: 'column',
    height: '150px',
    justifyContent: 'space-between',
    marginLeft: '20px',
    padding: '10px',
  },
  text: {
    fontWeight: 'bolder',
  },
}))
