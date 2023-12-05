import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
  center: {
    margin: '0 auto',
    maxWidth: '1300px',
    padding: '10px',
    width: '100%',
  },
  link: {
    '&:hover': {
      boxShadow: '0px 5px 10px 2px rgba(29, 97, 150, 0.2)',
    },
    textDecoration: 'none',
  },
  tickets: {
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))
