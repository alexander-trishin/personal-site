import { createStyles } from '@mantine/core';

const useAboutStyles = createStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        [theme.fn.largerThan('sm')]: {
            flexDirection: 'row'
        }
    },

    info: {
        maxWidth: theme.breakpoints.xs,

        [theme.fn.largerThan('sm')]: {
            maxWidth: theme.breakpoints.sm,
            paddingTop: theme.spacing.xl
        }
    },

    avatar: {
        position: 'relative',
        borderRadius: '50%'
    },

    message: {
        ...theme.headings.sizes.h5,
        textAlign: 'center',

        [theme.fn.largerThan('sm')]: {
            textAlign: 'start',
            paddingLeft: theme.spacing.xl * 2
        }
    },

    overview: {
        gap: theme.spacing.xl * 2,
        marginTop: theme.spacing.xl * 2,
        maxWidth: theme.breakpoints.xs,

        [theme.fn.largerThan('sm')]: {
            maxWidth: theme.breakpoints.md
        }
    },

    buttons: {
        marginTop: theme.spacing.xl * 3
    }
}));

export default useAboutStyles;
