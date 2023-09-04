import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({

    center: {
        display: 'flex',
        alignItems: 'start',
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 10px'
        },

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