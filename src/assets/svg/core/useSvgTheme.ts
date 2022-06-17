import { MantineTheme, useMantineTheme } from '@mantine/core';

type SvgTheme = MantineTheme & {
    isDarkMode: boolean;
    primaryColorCode: string;
};

const useSvgTheme = (): SvgTheme => {
    const theme = useMantineTheme();

    return {
        ...theme,
        isDarkMode: theme.colorScheme === 'dark',
        primaryColorCode: theme.colors[theme.primaryColor][6]
    };
};

export default useSvgTheme;
