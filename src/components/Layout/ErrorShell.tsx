import { Box, Center, Container, createStyles, Stack, Text, Title } from '@mantine/core';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

import { ThemeOther } from 'common/theme';
import { SearchEngineOptimization } from 'components';

type ErrorShellProps = Required<Pick<ComponentProps<typeof SearchEngineOptimization>, 'title'>> & {
    caption?: ReactNode;
    image?: ReactNode;
    message?: ReactNode;
};

const useErrorShellStyles = createStyles(theme => ({
    root: {
        minHeight: 750,
        minWidth: 350,

        height: '100vh',
        width: '100vw'
    },

    image: {
        maxWidth: 300,
        width: '100%',

        [theme.fn.largerThan('xs')]: {
            maxWidth: 400
        },

        [theme.fn.largerThan('sm')]: {
            maxWidth: 500
        }
    },

    message: {
        fontSize: (theme.other as ThemeOther).fn.clamp(14, 18)
    }
}));

const ErrorShell = (props: PropsWithChildren<ErrorShellProps>) => {
    const { caption, children, image, message, title } = props;

    const { classes } = useErrorShellStyles();

    return (
        <>
            <SearchEngineOptimization title={title} />

            <Center className={classes.root}>
                <Container size="sm">
                    <Stack align="center">
                        {image && (
                            <Box className={classes.image} mb="xl">
                                {image}
                            </Box>
                        )}
                        {caption && (
                            <Title order={3} align="center">
                                {caption}
                            </Title>
                        )}
                        {message && (
                            <Text className={classes.message} align="center" mx="xl" mb="xl">
                                {message}
                            </Text>
                        )}
                        {children}
                    </Stack>
                </Container>
            </Center>
        </>
    );
};

export default ErrorShell;
