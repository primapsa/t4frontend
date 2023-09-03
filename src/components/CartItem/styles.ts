import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    paper : {
        position: "relative",
        margin: '10px 0',
        padding: '5px 50px 5px 5px'
    },
    img: {
        width: '100px',
        height: '100px'
    },
    wrapper: {
        alignItems: "flex-start",
        width: '100%'
    },
    info: {
        flexDirection: "column",
        marginLeft: '10px',
        justifyContent: "space-between",
        width: '100%'
    },
    title: {
        fontWeight: 'bolder'
    },
    control: {
        marginTop: '20px',
        alignItems: "center",
        justifyContent: "space-between"
    },
    control__price: {
        flexDirection: "column"
    },
    icon: {
        position: "absolute",
        right: '5px',
        top: '5px'
    },

}))