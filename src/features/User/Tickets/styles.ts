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
        textDecoration: 'none',
        '&:hover': {
            boxShadow: '0px 5px 10px 2px rgba(29, 97, 150, 0.2)'
        }
    }
}));