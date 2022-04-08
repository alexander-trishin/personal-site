import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

import useStyles from 'styles/ErrorPage';

const InternalServerErrorPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    return (
        <Container className={classes.root} data-test-id="InternalServerErrorPage">
            <div className={classes.label}>500</div>
            <Title className={classes.title}>Something bad just happened...</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                Our servers could not handle your request. Don&apos;t worry, our development team
                was already notified. Try refreshing the page.
            </Text>
            <Group position="center">
                <Button onClick={router.reload} variant="subtle" size="md">
                    Take me back to home page
                </Button>
            </Group>
        </Container>
    );
};

export default InternalServerErrorPage;
