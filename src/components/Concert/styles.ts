import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({

    center: {
        marginTop: '20px'
    },
    paper: {
        padding: '30px',
        width: '950px',
        [theme.fn.smallerThan('1100')]: {
            width: rem(768),
        }, [theme.fn.smallerThan('800')]: {
            width: rem(500),
        }, [theme.fn.smallerThan('550')]: {
            width: rem(320),
        }, [theme.fn.smallerThan('350')]: {
            width: '100%',
        },

    },
    wrapper: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    },
    about: {
        marginTop: '20px',
        [theme.fn.smallerThan('550')]: {
            flexDirection: 'column'
        }

    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        [theme.fn.smallerThan('800')]: {
            fontSize: '26px'
        },
        [theme.fn.smallerThan('550')]: {
            fontSize: '20px'
        }
    },
    image: {
        objectFit: "cover",
        width: '100%',
        height: '100%'
    },
    container: {
        marginTop: '20px',
        width: '380px',
        [theme.fn.smallerThan('550')]: {
            width: rem(250),
        }, [theme.fn.smallerThan('350')]: {
            width: rem(180),
        },
    },
    optional: {
        margin: '20px 0',
        flexDirection: 'column'
    },
    innerHtml: {
        marginTop: '20px',
        maxWidth: '700px'
    },
    pin: {
        margin: '0 20px',
        [theme.fn.smallerThan('550')]: {
            margin: '20px 0'
        }
    },
    map: {
        marginTop: '20px',
        width: '100%',
        height: '200px'
    },
    innerMap: {
        width: '100%',
        height: '100%'
    },


    payblock: {
        flexDirection: "column",
        padding: '10px',
        height: '150px',
        justifyContent: 'space-between',
        marginLeft: '20px'
    },
    text: {
        fontWeight: 'bolder'
    },


}));