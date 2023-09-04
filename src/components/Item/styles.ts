import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    paper: {
        padding: '10px',
        width: '100%'
    },
    concert: {
        flexDirection: "column",
        marginLeft: "10px",
        width: '100%'
    },
    concert__info: {
        width: '100%',
        [theme.fn.smallerThan('678')]: {
            justifyContent: 'space-between'
        },
        [theme.fn.smallerThan('550')]: {
            marginTop: '10px',
            flexDirection: "column",
        },
    },
    concert__title: {
        fontWeight: 'bolder'
    },
    concert__tickets: {
        flexDirection: "column",
        margin: '0 20px',
        [theme.fn.smallerThan('550')]: {
            margin: 0
        },
    },
    concert__flex: {
        flexDirection: "column",
    },
    image: {
        [theme.fn.smallerThan('678')]: {
            display: 'none'
        },
    }
}));