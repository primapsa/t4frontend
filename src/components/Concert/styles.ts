import {createStyles} from "@mantine/core";
import {boolean} from "yup";

export const useStyles = createStyles((theme) => ({

    center: {
        marginTop: '20px'
        // display: 'flex',
        // alignItems: 'start',
        // [theme.fn.smallerThan('sm')]: {
        //     flexDirection: 'column',
        //     alignItems: 'center',
        //     padding: '0 10px'
        // },
    },
    paper: {
        padding: '30px',
        maxWidth: '1280px',

    },
    wrapper: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    },
    about: {
      marginTop: '20px'
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold'
    },
    image: {
        marginTop: '20px'
    },
    innerHtml: {
        marginTop: '20px',
        maxWidth: '700px'
    },
    pin: {
      margin: '0 20px'
    },
    map: {
        marginTop: '20px',
        width: '100%',
        height: '200px'
    },
    innerMap: {
        width: '100%',
        height: '100%'
    },



    payblock: {
        flexDirection: "column",
        padding: '10px',
        height: '150px',
        justifyContent: 'space-between',
        marginLeft: '20px'
    },
    text: {
        fontWeight: 'bolder'
    },


}));