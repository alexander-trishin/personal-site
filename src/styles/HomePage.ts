import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
    root: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 60,
        lineHeight: 1,
        marginBottom: theme.spacing.xl,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
        textTransform: 'uppercase',

        [theme.fn.smallerThan('sm')]: {
            fontSize: 40
        }
    },

    countdown: {
        display: 'flex',
        justifyContent: 'center'
    },

    indicator: {
        margin: `0 ${theme.spacing.xl}px`,

        [theme.fn.smallerThan('sm')]: {
            margin: `0 ${theme.spacing.sm}px`
        }
    },

    number: {
        fontSize: 34,
        fontWeight: 500,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 26
        }
    },

    text: {
        textAlign: 'center',
        fontSize: 12,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 8
        }
    }
}));

export default useStyles;
