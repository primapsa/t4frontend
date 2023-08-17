import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    header: {
        border: 0
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: rem(1116),
        height: rem(84),
        margin: `0px auto`,
        padding: 0,
        border: 0,
        [theme.fn.smallerThan('lg')]: {
            maxWidth: rem(950),
        },
        [theme.fn.smallerThan('md')]: {
            maxWidth: rem(700),
        },
        [theme.fn.smallerThan('sm')]: {
            maxWidth: rem(500),
            paddingLeft: rem(20)
            //   justifyContent: 'space-between',
        },
        [theme.fn.smallerThan('xs')]: {
            maxWidth: rem(400),
            paddingLeft: rem(10)
        },
    },

    links: {
        display: 'flex',
        [theme.fn.smallerThan('lg')]: {
            marginLeft: rem(200)
        },
        [theme.fn.smallerThan('md')]: {
            marginLeft: rem(150)
        },
        [theme.fn.smallerThan('sm')]: {
            marginLeft: rem(50)
        },
        [theme.fn.smallerThan('xs')]: {
            marginLeft: rem(10)
        },
        marginLeft: rem(280),

    },
    home: {
        display: 'flex',
        textDecoration: 'none'
    },
    linkHeader: {
        marginLeft: rem(12),
        color: '#232134',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        fontSize: rem(24),
        fontStyle: 'normal',
        lineHeight: rem(36),
        letterSpacing: '-0.02em',
        [theme.fn.smallerThan('xs')]: {
            display: 'none'
        }
    },
    link: {
        marginRight: rem(56),
        display: 'flex',
        textDecoration: 'none',
        color: '#232134',
        fontSize: rem(16),
        fontWeight: 500,
        lineHeight: rem(20),
        fontStyle: 'normal',
        '&:last-child': {
            marginRight: 0
        },
        '&:hover':
            {
                backgroundColor: "transparent",
            },
        [theme.fn.smallerThan('sm')]: {
            marginRight: rem(20)
        }
    },
    active: {
        color: '#5E96FC'
    },
    linkActive: {
        '&, &:hover':
            {
                color: '#5E96FC'
            },
    },
}));