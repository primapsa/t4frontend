import {createStyles} from "@mantine/core";

export const useStyles = createStyles(() => ({

    container: {
        position: "relative",
        display: "flex"
    },
    round: {
        position: "absolute",
        top: '-10px',
        right: '-10px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        lineHeight: '13px'
    },
}));