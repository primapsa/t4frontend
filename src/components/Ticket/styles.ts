import {createStyles} from "@mantine/core";

export const useStyles = createStyles(() => ({
    wrapper: {
       maxWidth: '300px',
        padding: '10px',
        height: '100%',
        margin: '10px'
    },
    date__text: {
        fontWeight: 'normal'
    },
    title: {
        textAlign: "center",
        margin: '5px 0',
        height: '50px',
        fontWeight: 'bolder'
    },
    img: {
        objectFit: "cover",
        width: "100%",
        height: "100%"
    },
    date: {
       flexDirection:"column",
       marginLeft: '10px'
    },
    address__text: {
        marginLeft: '10px',
        fontWeight: "normal"
    },
    wallet: {
        margin: '10px 0'
    },
    address: {
        marginBottom: '10px'
    },
    buy: {
        justifyContent: "right"
    },


}))