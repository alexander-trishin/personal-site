import type { GetStaticProps } from 'next';

import { Button, Group } from '@mantine/core';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { ErrorShell } from 'client/components';
import { getMessages } from 'client/i18n';

const PageNotFoundImage = dynamic(() => import('client/assets/svg/PageNotFound'));

const NotFoundPage = () => {
    const t = useTranslations('not-found');

    return (
        <ErrorShell
            title={t('title')}
            image={<PageNotFoundImage />}
            caption={t('heading')}
            message={t('description')}
        >
            <Group position="center">
                <Link href="/" passHref replace>
                    <Button component="a" variant="default">
                        {t('go-home')}
                    </Button>
                </Link>
            </Group>
        </ErrorShell>
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
