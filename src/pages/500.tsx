import { Button, Group, Skeleton } from '@mantine/core';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Suspense } from 'react';

import { ErrorShell } from 'client/components';
import { getMessages } from 'shared/i18n';

const ServerDownImage = dynamic(() => import('client/assets/svg/ServerDown'), { suspense: true });

const InternalServerErrorPage = () => {
    const router = useRouter();
    const t = useTranslations('internal-server-error');

    const handleClick = () => router.reload();

    return (
        <ErrorShell
            title={t('title')}
            image={
                <Suspense fallback={<Skeleton height={200} />}>
                    <ServerDownImage />
                </Suspense>
            }
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
