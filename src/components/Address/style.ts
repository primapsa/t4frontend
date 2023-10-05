import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    container: {
        flexDirection: 'column',
        position: 'relative'
    },
    dropdown: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'column',
        top: '60px',
        zIndex: 1,
        padding: '5px',
        backgroundColor: 'white',
        borderRadius: '0.25rem',
        boxShadow: '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 2.25rem 1.75rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 1.0625rem 1.0625rem -0.4375rem',

    },
    item: {

        color: 'black',
        marginTop: '10px',
        fontSize: '12px',
        padding: '5px 12px',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: "#F8F9FA"
        }
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

}));