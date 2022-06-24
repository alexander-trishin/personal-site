import { Box, BoxProps, createStyles } from '@mantine/core';
import { PropsWithoutRef } from 'react';

import { HomeZIndex } from './Home.constants';

type MainProps = Omit<BoxProps<'main'>, 'component'>;

const useMainStyles = createStyles(theme => ({
    root: {
        position: 'relative',
        zIndex: HomeZIndex.Main,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        boxShadow: theme.shadows.md
    }
}));

const Main = (props: PropsWithoutRef<MainProps>) => {
    const { children, className, ...rest } = props;

    const { classes, cx } = useMainStyles();

    return (
        <Box {...rest} component="main" className={cx(classes.root, className)}>
            {children}
        </Box>
    );
};

export default Main;
