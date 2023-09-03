import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    wrapper: {
        marginTop: '10px',
        alignItems: 'center',
        width: '100%'
    },
    badge: {
       justifyContent: "flex-end"
    },
    input: {
        margin: '0 5px',
        minHeight: '15px',
        height: '22px'
    },
    button: {
        marginLeft: '15px'
    },
    icon: {
        height: '15px'
    },

}))