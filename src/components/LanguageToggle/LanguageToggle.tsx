import { ActionIcon, ActionIconProps, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { MouseEventHandler, PropsWithoutRef } from 'react';

import FlagRu from 'assets/svg/FlagRu';
import FlagUs from 'assets/svg/FlagUs';

type LanguageToggleProps = ActionIconProps<'button'>;

const useLanguageToggleStyles = createStyles(() => ({
    root: {
        backgroundColor: 'transparent',
        padding: 3
    }
}));

const LanguageToggle = (props: PropsWithoutRef<LanguageToggleProps>) => {
    const { className, onClick, ...rest } = props;

    const { classes, cx } = useLanguageToggleStyles();
    const { locale, pathname, query, asPath, replace } = useRouter();

    const Icon = locale === 'ru-ru' ? FlagRu : FlagUs;

    const toggleLocale: MouseEventHandler<HTMLButtonElement> = event => {
        replace({ pathname, query }, asPath, {
            locale: locale === 'ru-ru' ? 'en-us' : 'ru-ru',
            scroll: false
        });

        onClick?.(event);
    };

    return (
        <ActionIcon {...rest} className={cx(classes.root, className)} onClick={toggleLocale}>
            <Icon />
        </ActionIcon>
    );
};

export default LanguageToggle;
