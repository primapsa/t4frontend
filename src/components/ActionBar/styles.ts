import {createStyles} from "@mantine/core";

export const useStyles = createStyles(() => ({
    bar: {
        flexDirection: 'column',
        justifyContent: "center",
        padding: '10px'
    },
    icon: {
        '&:not(last-child)': {
            marginBottom: '5px'
        },

    }
}));