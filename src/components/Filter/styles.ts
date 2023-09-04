import {createStyles, rem} from "@mantine/core";

export const useStyles = createStyles((theme) => ({

    form: {
        padding: '0 10px',
        display: 'flex',
        width: '100%',
        margin: '15px 0',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('1280')]: {
            maxWidth: rem(950),
        },
        [theme.fn.smallerThan('980')]: {
           flexDirection: "column",
            maxWidth: rem(650),
            alignItems: 'center'
        },
        [theme.fn.smallerThan('650')]: {
            maxWidth: rem(320),
        },
    },
    search: {
        maxWidth: '500px',
        width: '100%',
        [theme.fn.smallerThan('1280')]: {
            maxWidth: '380px',
        },
        [theme.fn.smallerThan('980')]: {
            maxWidth: '400px',
        },
    },
    type: {
        maxWidth: '300px',
        width: '100%',
        [theme.fn.smallerThan('980')]: {
            maxWidth: '400px',
            width: '100%',
            margin: '10px 0'
        },
    },
}));