import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
    button: {
        ...theme.fn.focusStyles(),

        height: theme.spacing.md * 2,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: theme.radius.md,
        textDecoration: 'none',
        userSelect: 'none'
    },

    svg: {
        height: theme.spacing.md * 2
    }
}));

export default useStyles;
