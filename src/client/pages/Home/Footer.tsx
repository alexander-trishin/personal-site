import { Box, Container, createStyles, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { ComponentProps, forwardRef } from 'react';

import Social from './Social';

type FooterProps = Omit<ComponentProps<typeof Box<'footer'>>, 'component'>;

const useFooterStyles = createStyles(theme => {
    const socialSize = theme.other.fn.clamp(24, 28);

    return {
        container: {
            padding: `${theme.spacing.xl}px ${theme.spacing.xl * 3}px`,

            maxWidth: theme.breakpoints.xs,
            textAlign: 'center',

            [theme.fn.largerThan('sm')]: {
                maxWidth: theme.breakpoints.md,
                textAlign: 'start'
            }
        },

        social: {
            marginBottom: theme.spacing.xs,

            [theme.fn.largerThan('sm')]: {
                float: 'right',
                marginBottom: 0
            },

            '> ul > li > a': {
                minHeight: socialSize,
                minWidth: socialSize,
                height: socialSize,
                width: socialSize
            }
        },

        copyright: {
            fontSize: theme.other.fn.clamp(14, 16),

            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'center',

            [theme.fn.largerThan('xs')]: {
                flexDirection: 'row'
            },

            [theme.fn.largerThan('sm')]: {
                justifyContent: 'flex-start'
            }
        },

        separator: {
            display: 'none',

            [theme.fn.largerThan('xs')]: {
                display: 'inline',
                margin: `0 ${theme.spacing.xs}px`
            }
        }
    };
});

const Footer = forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
    const { classes } = useFooterStyles();

    const t = useTranslations('shared');

    return (
        <Box {...props} component="footer" ref={ref}>
            <Container className={classes.container}>
                <Box className={classes.social}>
                    <Social />
                </Box>
                <Box className={classes.copyright}>
                    <Text component="span" inherit>
                        &copy; {t('author')} 2022
                    </Text>
                    <Text component="span" className={classes.separator} inherit>
                        |
                    </Text>
                    <Text component="span" inherit>
                        {t('rights-reserved')}
                    </Text>
                </Box>
            </Container>
        </Box>
    );
});

Footer.displayName = 'Footer';

export default Footer;
