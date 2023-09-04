import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({

    promocode: {
        padding: '10px',
        width: '400px',
        [theme.fn.smallerThan('500')]: {
            width: '250px'
        },
    },
    promocode__title: {
        fontWeight: 'bolder'
    },
    promocode__inner: {
        justifyContent: "space-between",
        marginBottom: '20px'
    },
}));