import type { MouseEventHandler, PropsWithoutRef } from 'react';

import {
    ActionIcon,
    ActionIconProps,
    createStyles,
    Sx,
    useMantineColorScheme
} from '@mantine/core';
import { BiSun, BiMoon } from 'react-icons/bi';

type ColorSchemeToggleProps = Omit<ActionIconProps<'button'>, 'sx'> & {
    sx?: Sx;
};

const useColorSchemeToggleStyles = createStyles(theme => ({
    root: {
        ...theme.fn.focusStyles(),
        backgroundColor: 'transparent'
    }
}));

const ColorSchemeToggle = (props: PropsWithoutRef<ColorSchemeToggleProps>) => {
    const { className, onClick, ...rest } = props;

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { classes, cx } = useColorSchemeToggleStyles();

    const Icon = colorScheme === 'dark' ? BiSun : BiMoon;

    const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
        toggleColorScheme();

        onClick?.(event);
    };

    return (
        <ActionIcon {...rest} className={cx(classes.root, className)} onClick={handleClick}>
            <Icon size="75%" />
        </ActionIcon>
    );
};

export default ColorSchemeToggle;
