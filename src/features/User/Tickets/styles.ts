import {createStyles} from "@mantine/core";

export const useStyles = createStyles(() => ({
    center: {
        padding: '10px',
        maxWidth: '1300px',
        width: '100%',
        margin: '0 auto'
    },
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tickets: {
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap"
    },
    link: {
        textDecoration: 'none'
    }
}));