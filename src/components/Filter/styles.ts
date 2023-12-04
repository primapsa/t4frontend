import { createStyles, rem } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0',
    padding: '0 10px',
    [theme.fn.smallerThan('650')]: {
      width: rem(320),
    },

    [theme.fn.smallerThan('980')]: {
      alignItems: 'center',
      flexDirection: 'column',
      width: rem(650),
    },
    [theme.fn.smallerThan('1280')]: {
      width: rem(950),
    },
    width: '1280px',
  },
  search: {
    maxWidth: '500px',
    [theme.fn.smallerThan('980')]: {
      maxWidth: '400px',
    },
    [theme.fn.smallerThan('1280')]: {
      maxWidth: '380px',
    },
    width: '100%',
  },
  type: {
    maxWidth: '300px',
    [theme.fn.smallerThan('980')]: {
      margin: '10px 0',
      maxWidth: '400px',
      width: '100%',
    },
    width: '100%',
  },
}))
