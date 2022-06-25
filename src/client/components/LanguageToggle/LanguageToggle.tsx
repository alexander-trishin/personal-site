import { ActionIcon, ActionIconProps, createStyles } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithoutRef } from 'react';

import FlagRu from 'client/assets/svg/FlagRu';
import FlagUs from 'client/assets/svg/FlagUs';

type LanguageToggleProps = Omit<ActionIconProps<'a'>, 'component'>;

const useLanguageToggleStyles = createStyles(() => ({
    root: {
        backgroundColor: 'transparent',
        padding: 3
    }
}));

const LanguageToggle = (props: PropsWithoutRef<LanguageToggleProps>) => {
    const { className, ...rest } = props;

    const { classes, cx } = useLanguageToggleStyles();
    const { locale, asPath } = useRouter();

    const nextLocale = locale === 'ru' ? 'en' : 'ru';
    const Icon = locale === 'ru' ? FlagRu : FlagUs;

    return (
        <Link replace href={asPath} locale={nextLocale} scroll={false} passHref>
            <ActionIcon
                {...rest}
                component="a"
                lang={nextLocale}
                className={cx(classes.root, className)}
            >
                <Icon />
            </ActionIcon>
        </Link>
    );
};

export default LanguageToggle;
