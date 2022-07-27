import { createStyles } from '@mantine/core';

import { HomeZIndex } from './Home.constants';

const useIntroStyles = createStyles(theme => {
    const darkMode = theme.colorScheme === 'dark';

    const primaryColor = theme.other.fn.getPrimaryColor(theme);
    const socialSize = theme.other.fn.clamp(26, 32);

    return {
        root: {
            position: 'relative',

            minHeight: 600,
            height: '100vh',

            [theme.fn.largerThan('sm')]: {
                minHeight: 660
            },

            [theme.fn.largerThan('md')]: {
                minHeight: 720
            }
        },

        image: {
            position: 'absolute',
            inset: 0,
            zIndex: HomeZIndex.IntroImage
        },

        overlay: {
            position: 'absolute',
            inset: 0,
            zIndex: HomeZIndex.IntroOverlay,

            background: darkMode ? theme.black : theme.white,
            opacity: 0.85
        },

        content: {
            position: 'relative',
            zIndex: HomeZIndex.IntroContent,
            height: '100%',
            width: '100%',

            transform: `translateY(-${theme.spacing.xs}px)`
        },

        hello: {
            fontFamily: theme.headings.fontFamily,
            fontWeight: 700,
            fontSize: theme.other.fn.clamp(15, 23),
            letterSpacing: 2,

            color: primaryColor,
            margin: 0
        },

        name: {
            ...theme.headings.sizes.h1,
            fontWeight: 700,
            fontFamily: theme.headings.fontFamily,

            color: darkMode ? theme.white : theme.black,
            margin: 0
        },

        position: {
            fontSize: theme.other.fn.clamp(14, 18),
            letterSpacing: 2,

            margin: 0
        },

        button: {
            fontFamily: theme.headings.fontFamily,
            letterSpacing: 2,

            height: 'auto',
            padding: theme.spacing.md,

            [theme.fn.largerThan('md')]: {
                padding: theme.spacing.lg
            },

            background: 'transparent',
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: theme.colors.dark[darkMode ? 3 : 4],
            transition: 'border-color 300ms ease-in-out',

            ':focus, :hover': {
                borderColor: primaryColor,
                background: 'transparent'
            }
        },

        social: {
            position: 'absolute',
            zIndex: HomeZIndex.IntroSocial,
            left: 0,
            right: 0,
            bottom: theme.spacing.xl * 3,

            textAlign: 'center',

            '> li > a': {
                minHeight: socialSize,
                minWidth: socialSize,
                height: socialSize,
                width: socialSize
            }
        }
    };
});

export default useIntroStyles;
