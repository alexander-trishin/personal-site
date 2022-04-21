import { Button, Container, Group, Text, Title } from '@mantine/core';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

import { getMessages } from 'i18n';
import useStyles from 'styles/ErrorPage';

const InternalServerErrorPage = () => {
    const router = useRouter();
    const t = useTranslations('internal-server-error');

    const { classes } = useStyles();

    return (
        <Container className={classes.root} data-test-id="InternalServerErrorPage">
            <div className={classes.label}>500</div>
            <Title className={classes.title}>{t('title')}</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                {t('description')}
            </Text>
            <Group position="center">
                <Button onClick={router.reload} variant="subtle" size="md">
                    {t('refresh')}
                </Button>
            </Group>
        </Container>
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
