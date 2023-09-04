import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    root: {
        width: '100%',
        [theme.fn.smallerThan('370')]: {
            width: '250px'
        },
    },
    mirror: {
        height: '500px'
    },
}));