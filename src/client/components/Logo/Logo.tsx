import type { AnchorHTMLAttributes, PropsWithoutRef } from 'react';

import { createStyles, UnstyledButton } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import LogoSvg from 'client/assets/svg/Logo';

type LogoProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'>;

const useLogoStyles = createStyles(theme => ({
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

const Logo = (props: PropsWithoutRef<LogoProps>) => {
    const { className, ...rest } = props;

    const t = useTranslations('shared');
    const { classes, cx } = useLogoStyles();

    return (
        <Link href="/" passHref>
            <UnstyledButton<'a'>
                {...rest}
                component="a"
                className={cx(classes.button, className)}
                title={t('home-page')}
            >
                <LogoSvg className={classes.svg} />
            </UnstyledButton>
        </Link>
    );
};

export default Logo;
