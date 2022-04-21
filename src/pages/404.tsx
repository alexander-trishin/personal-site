import type { GetStaticProps } from 'next';

import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { getMessages } from 'i18n';
import useStyles from 'styles/ErrorPage';

const NotFoundPage = () => {
    const t = useTranslations('not-found');

    const { classes } = useStyles();

    return (
        <Container className={classes.root} data-test-id="NotFoundPage">
            <div className={classes.label}>404</div>
            <Title className={classes.title}>{t('title')}</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                {t('description')}
            </Text>
            <Group position="center">
                <Link href="/" passHref>
                    <Button component="a" variant="subtle" size="md" data-test-id="go-home">
                        {t('go-home')}
                    </Button>
                </Link>
            </Group>
        </Container>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            messages: await getMessages(locale, ['not-found'])
        }
    };
};

export default NotFoundPage;
