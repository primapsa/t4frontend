import { createStyles, rem } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  about: {
    marginTop: '20px',
    [theme.fn.smallerThan('550')]: {
      flexDirection: 'column',
    },
  },
  center: {
    marginTop: '20px',
  },
  container: {
    marginTop: '20px',
    [theme.fn.smallerThan('350')]: {
      width: rem(180),
    },
    [theme.fn.smallerThan('550')]: {
      width: rem(250),
    },
    width: '380px',
  },
  image: {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  innerHtml: {
    marginTop: '20px',
    maxWidth: '700px',
  },
  innerMap: {
    height: '100%',
    width: '100%',
  },
  map: {
    height: '200px',
    marginTop: '20px',
    width: '100%',
  },
  optional: {
    flexDirection: 'column',
    margin: '20px 0',
  },
  paper: {
    padding: '30px',
    [theme.fn.smallerThan('350')]: {
      width: '100%',
    },
    [theme.fn.smallerThan('550')]: {
      width: rem(320),
    },
    [theme.fn.smallerThan('800')]: {
      width: rem(500),
    },
    [theme.fn.smallerThan('1100')]: {
      width: rem(768),
    },
    width: '950px',
  },
  payblock: {
    flexDirection: 'column',
    height: '150px',
    justifyContent: 'space-between',
    marginLeft: '20px',
    padding: '10px',
  },
  pin: {
    margin: '0 20px',
    [theme.fn.smallerThan('550')]: {
      margin: '20px 0',
    },
  },
  text: {
    fontWeight: 'bolder',
  },

  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    [theme.fn.smallerThan('550')]: {
      fontSize: '20px',
    },
    [theme.fn.smallerThan('800')]: {
      fontSize: '26px',
    },
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))
