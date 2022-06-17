import { Box, BoxProps, Container, createStyles, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { PropsWithoutRef } from 'react';

import { ThemeOther } from 'common/theme';

import Social from './Social';

type FooterProps = Omit<BoxProps<'footer'>, 'component'>;

const useFooterStyles = createStyles(theme => {
    const other = theme.other as ThemeOther;

    const socialSize = other.fn.clamp(24, 28);

    return {
        container: {
            padding: `${theme.spacing.xl}px ${theme.spacing.xl * 3}px`,

            maxWidth: theme.breakpoints.xs,
            textAlign: 'center',

            [theme.fn.largerThan('sm')]: {
                maxWidth: theme.breakpoints.sm,
                textAlign: 'start'
            },

            [theme.fn.largerThan('md')]: {
                maxWidth: theme.breakpoints.md
            },

            [theme.fn.largerThan('lg')]: {
                maxWidth: theme.breakpoints.lg
            },

            [theme.fn.largerThan('xl')]: {
                maxWidth: theme.breakpoints.xl
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
            fontSize: other.fn.clamp(14, 16),

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

const Footer = (props: PropsWithoutRef<FooterProps>) => {
    const { classes } = useFooterStyles();

    const t = useTranslations('shared');

    return (
        <Box {...props} component="footer">
            <Container className={classes.container}>
                <Box className={classes.social}>
                    <Social />
                </Box>
                <Box className={classes.copyright}>
                    <Text component="span" inherit>
                        &copy; {t('author.first-name')} {t('author.last-name')} 2022
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
};

export default Footer;
