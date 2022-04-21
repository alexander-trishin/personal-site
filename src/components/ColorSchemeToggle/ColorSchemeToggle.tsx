import { UnstyledButton, useMantineColorScheme } from '@mantine/core';
import { BiSun, BiMoon } from 'react-icons/bi';

import useStyles from './ColorSchemeToggle.styles';

const ColorSchemeToggle = () => {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const Icon = colorScheme === 'dark' ? BiSun : BiMoon;

    const handleClick = () => toggleColorScheme();

    return (
        <UnstyledButton className={classes.root} onClick={handleClick}>
            <Icon size={20} />
        </UnstyledButton>
    );
};

export default ColorSchemeToggle;
