import { Button, Group } from '@mantine/core';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { ErrorShell } from 'components';
import { getMessages } from 'i18n';

const ServerDownImage = dynamic(() => import('assets/svg/ServerDown'));

const InternalServerErrorPage = () => {
    const router = useRouter();
    const t = useTranslations('internal-server-error');

    const handleClick = () => router.reload();

    return (
        <ErrorShell
            title={t('title')}
            image={<ServerDownImage />}
            caption={t('heading')}
            message={t('description')}
        >
            <Group position="center">
                <Button onClick={handleClick} variant="subtle" size="md">
                    {t('refresh')}
                </Button>
            </Group>
        </ErrorShell>
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
