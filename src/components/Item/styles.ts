import { createStyles } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  concert: {
    flexDirection: 'column',
    marginLeft: '10px',
    width: '100%',
  },
  concert__flex: {
    flexDirection: 'column',
  },
  concert__info: {
    [theme.fn.smallerThan('550')]: {
      flexDirection: 'column',
      marginTop: '10px',
    },
    [theme.fn.smallerThan('678')]: {
      justifyContent: 'space-between',
    },
    width: '100%',
  },
  concert__tickets: {
    flexDirection: 'column',
    margin: '0 20px',
    [theme.fn.smallerThan('550')]: {
      margin: 0,
    },
  },
  concert__title: {
    fontWeight: 'bolder',
  },
  image: {
    [theme.fn.smallerThan('678')]: {
      display: 'none',
    },
  },
  paper: {
    padding: '10px',
    width: '100%',
  },
}))
