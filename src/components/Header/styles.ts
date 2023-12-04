import { createStyles, rem } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  active: {
    color: '#5E96FC',
  },
  button: {
    '&:hover': {
      color: 'red',
    },
    cursor: 'pointer',
    marginLeft: '20px',
    maxWidth: '150px',
  },

  container: {
    alignItems: 'center',
    border: 0,
    display: 'flex',
    height: rem(84),
    justifyContent: 'space-between',
    margin: `0px auto`,
    maxWidth: rem(1116),
    padding: 0,
    [theme.fn.smallerThan('lg')]: {
      maxWidth: rem(950),
    },
    [theme.fn.smallerThan('md')]: {
      maxWidth: rem(700),
    },
    [theme.fn.smallerThan('sm')]: {
      maxWidth: rem(500),
      paddingLeft: rem(20),
      //   justifyContent: 'space-between',
    },
    [theme.fn.smallerThan('xs')]: {
      maxWidth: rem(400),
      paddingLeft: rem(10),
    },
    width: '100%',
  },
  header: {
    border: 0,
    [theme.fn.smallerThan('xs')]: {
      padding: '0 10px',
    },
  },
  home: {
    display: 'flex',
    textDecoration: 'none',
  },
  link: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:last-child': {
      marginRight: 0,
    },
    color: '#232134',
    display: 'flex',
    fontSize: rem(16),
    fontWeight: 500,
    lineHeight: rem(20),

    marginRight: rem(56),
    textDecoration: 'none',
    [theme.fn.smallerThan('sm')]: {
      marginRight: rem(20),
    },
  },
  linkActive: {
    '&, &:hover': {
      color: '#5E96FC',
    },
  },
  linkHeader: {
    color: '#232134',
    fontSize: rem(24),
    fontStyle: 'normal',
    fontWeight: 600,
    marginLeft: rem(12),

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  links: {
    display: 'flex',
  },
  text: {
    fontSize: '15px',
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}))
