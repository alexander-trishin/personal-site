import type { AnchorHTMLAttributes, PropsWithoutRef } from 'react';

import { UnstyledButton } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import useStyles from './Logo.styles';
import LogoImage from './LogoImage';

const Logo = (props: PropsWithoutRef<AnchorHTMLAttributes<HTMLAnchorElement>>) => {
    const { className, title, ...restProps } = props;

    const t = useTranslations('shared');
    const { classes, cx } = useStyles();

    return (
        <Link href="/" passHref>
            <UnstyledButton<'a'>
                {...restProps}
                component="a"
                className={cx(classes.logo, className)}
                title={t('home-page')}
            >
                <LogoImage className={classes.image} />
            </UnstyledButton>
        </Link>
    );
};

export default Logo;
