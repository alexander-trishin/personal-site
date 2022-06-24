import type { MouseEventHandler, PropsWithoutRef } from 'react';

import {
    ActionIcon,
    ActionIconProps,
    createStyles,
    Tooltip,
    useMantineColorScheme,
    useMantineTheme
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { BiSun, BiMoon } from 'react-icons/bi';

type ColorSchemeToggleProps = ActionIconProps<'button'>;

const useColorSchemeToggleStyles = createStyles(() => ({
    root: {
        backgroundColor: 'transparent'
    }
}));

const ColorSchemeToggle = (props: PropsWithoutRef<ColorSchemeToggleProps>) => {
    const { className, onClick, ...rest } = props;

    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { classes, cx } = useColorSchemeToggleStyles();
    const t = useTranslations('shared');

    const Icon = colorScheme === 'dark' ? BiSun : BiMoon;
    const tooltip = colorScheme === 'dark' ? t('theme.light-mode') : t('theme.dark-mode');

    const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
        toggleColorScheme();

        onClick?.(event);
    };

    return (
        <Tooltip disabled={isMobile} label={tooltip} withArrow openDelay={200}>
            <ActionIcon {...rest} className={cx(classes.root, className)} onClick={handleClick}>
                <Icon size="75%" />
            </ActionIcon>
        </Tooltip>
    );
};

export default ColorSchemeToggle;
