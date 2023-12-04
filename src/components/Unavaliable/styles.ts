import { createStyles, rem } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  description: {
    margin: 'auto',
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    marginTop: theme.spacing.xl,
    maxWidth: rem(500),
  },

  label: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
    fontSize: rem(220),
    fontWeight: 900,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  root: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
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
