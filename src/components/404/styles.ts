import { createStyles, rem } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  description: {
    margin: 'auto',
    marginBottom: rem(36),
    marginTop: theme.spacing.xl,
    maxWidth: rem(500),
  },

  label: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
    fontSize: rem(220),
    fontWeight: 900,
    lineHeight: 1,
    marginBottom: rem(36),
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  root: {
    paddingBottom: rem(80),
    paddingTop: rem(80),
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(38),
    fontWeight: 900,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },
}))
