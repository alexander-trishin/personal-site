import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
    logo: {
        ...theme.fn.focusStyles(),
        width: 34,
        height: 34,
        borderRadius: theme.radius.md,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        backgroundColor: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[7],
        textDecoration: 'none',
        userSelect: 'none'
    },

    image: {
        height: 30
    }
}));

export default useStyles;
