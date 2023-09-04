import {createStyles} from "@mantine/core";

export const useStyles = createStyles(() => ({

    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        maxWidth: '700px',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 10px'
    },
    button: {
        margin: '25px 0',
        alignSelf: 'start'
    },
    concerts: {
        flexDirection: 'column',
        width: '100%'
    },
    item: {
        flexGrow: 1,
        margin: '10px 0'
    },
    content: {
        overflowY: 'unset',
        maxHeight: 'unset'
    },
    inner: {
      overflow: "scroll"
    }
}));