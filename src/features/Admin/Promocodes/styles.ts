import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    wrapper: {
        marginTop: '20px',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignSelf: "start"
    },
    promocodes: {
        marginTop: '20px',
        flexDirection: 'column'
    },
    promocode: {
        margin: '10px 0'

    },
}));