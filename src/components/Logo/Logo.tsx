import type { AnchorHTMLAttributes, PropsWithoutRef } from 'react';

import { UnstyledButton } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import LogoSvg from 'assets/svg/Logo';

import useStyles from './Logo.styles';

type LogoProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'>;

const Logo = (props: PropsWithoutRef<LogoProps>) => {
    const { className, ...rest } = props;

    const t = useTranslations('shared');
    const { classes, cx } = useStyles();

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
