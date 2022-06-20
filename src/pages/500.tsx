import { Button, Container, Group, Text, Title } from '@mantine/core';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

import useStyles from 'assets/styles/pages/error';
import { getMessages } from 'i18n';

const InternalServerErrorPage = () => {
    const router = useRouter();

    const t = useTranslations('internal-server-error');

    const { classes } = useStyles();

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>
            <Container className={classes.root}>
                <div className={classes.label}>500</div>
                <Title className={classes.title}>{t('heading')}</Title>
                <Text color="dimmed" size="lg" align="center" className={classes.description}>
                    {t('description')}
                </Text>
                <Group position="center">
                    <Button onClick={router.reload} variant="subtle" size="md">
                        {t('refresh')}
                    </Button>
                </Group>
            </Container>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            messages: await getMessages(locale, ['internal-server-error'])
        }
    };
};

export default InternalServerErrorPage;
