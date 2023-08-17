import {rem} from "@mantine/core";

export const appTheme: any = {
    globalStyles: (theme:Object) => ({
        body: {
            backgroundColor: '#F5F5F5',
            boxSizing: 'border-box',
            position: "relative"

        },
        input: {
            "::placeholder": {
                fontSize: rem(14)
            }
        },
        '.active': {
            color: `#5E96FC`
        },
    }),
    breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lm: '52em',
        lg: '74em',
        xl: '90em',
    },
    fontFamily: "Inter, sans-serif",
    loader: "oval"
}
export const styles = {width: '100%', padding: 0, maxWidth: '100%'}