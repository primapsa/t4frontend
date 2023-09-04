import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    container: {
        width: '1200px',
        [theme.fn.smallerThan('1400')]: {
            width: '1024px'
        },
        [theme.fn.smallerThan('1170')]: {
            width: '768px'
        },
        [theme.fn.smallerThan('880')]: {
            width: '480px'
        },
        [theme.fn.smallerThan('570')]: {
            width: '300px',
            margin: '0 auto',
            padding: '5px'
        },

    },
    box: {
        maxWidth: '270px',
        width: '100%',
        [theme.fn.smallerThan('1400')]: {
            maxWidth: '250px'
        },
        [theme.fn.smallerThan('1170')]: {
            maxWidth: '185px'
        },
        [theme.fn.smallerThan('880')]: {
            maxWidth: '220px'
        },
        [theme.fn.smallerThan('570')]: {
            maxWidth: '100%'
        },
        [theme.fn.smallerThan('380')]: {
            maxWidth: '250px'
        },
    },
    wrapper: {
        alignItems: "start",
        justifyContent: 'space-between',
        marginBottom: '15px',
        [theme.fn.smallerThan('880')]: {
            flexWrap: 'wrap'
        },
        [theme.fn.smallerThan('570')]: {
            justifyContent: 'center'
        },
        [theme.fn.smallerThan('380')]: {
            maxWidth: '250px'
        },
    },
    submit: {
        alignItems: "center",
        justifyContent: "right",
        marginTop: '20px',
        width: '100%',
        [theme.fn.smallerThan('450')]: {
           width: '200px'
        },


    }

    //
    // paper: {
    //     padding: '10px',
    //     width: '100%'
    // },
    // concert: {
    //     flexDirection: "column",
    //     marginLeft: "10px",
    //     width: '100%'
    // },
    // concert__info: {
    //     width: '100%',
    //     [theme.fn.smallerThan('678')]: {
    //         justifyContent: 'space-between'
    //     },
    //     [theme.fn.smallerThan('550')]: {
    //         marginTop: '10px',
    //         flexDirection: "column",
    //     },
    // },
    // concert__title: {
    //     fontWeight: 'bolder'
    // },
    // concert__tickets: {
    //     flexDirection: "column",
    //     margin: '0 20px',
    //     [theme.fn.smallerThan('550')]: {
    //         margin: 0
    //     },
    // },
    // concert__flex: {
    //     flexDirection: "column",
    // },
    // image: {
    //     [theme.fn.smallerThan('678')]: {
    //         display: 'none'
    //     },
    // }
}));