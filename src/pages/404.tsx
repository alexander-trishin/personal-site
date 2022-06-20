import type { GetStaticProps } from 'next';

import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';

import useStyles from 'assets/styles/pages/error';
import { getMessages } from 'i18n';

const NotFoundPage = () => {
    const t = useTranslations('not-found');

    const { classes } = useStyles();

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>
            <Container className={classes.root}>
                <div className={classes.label}>404</div>
                <Title className={classes.title}>{t('heading')}</Title>
                <Text color="dimmed" size="lg" align="center" className={classes.description}>
                    {t('description')}
                </Text>
                <Group position="center">
                    <Link href="/" passHref>
                        <Button component="a" variant="subtle" size="md">
                            {t('go-home')}
                        </Button>
                    </Link>
                </Group>
            </Container>
        </>
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
