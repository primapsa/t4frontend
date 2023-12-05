import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
  button: {
    alignSelf: 'start',
    margin: '25px 0',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  concerts: {
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    maxHeight: 'unset',
    overflowY: 'unset',
  },
  inner: {
    overflow: 'scroll',
  },
  item: {
    margin: '10px 0',
    width: '100%',
  },
  link: {
    '&:hover': {
      boxShadow: '0px 5px 10px 2px rgba(29, 97, 150, 0.2)',
    },
    textDecoration: 'none',
    width: '100%',
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    maxWidth: '850px',
    padding: '0 10px',
    width: '100%',
  },
}))
