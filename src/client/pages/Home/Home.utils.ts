import { NotificationProps, showNotification } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { getCsrfToken, postSendEmail } from 'shared/requests';
import { isClientSide } from 'shared/utils/dom';

import { ContactData } from './Contact.types';

export const useAos = () => {
    const [isClientMounted, setIsClientMounted] = useState(false);

    useEffect(() => {
        if (isClientSide()) {
            setIsClientMounted(true);
        }
    }, []);

    useEffect(() => {
        const initialize = async () => {
            const aos = await import('aos');

            aos.init({
                once: true,
                duration: 1000
            });
        };

        if (isClientMounted) {
            initialize();
        }
    }, [isClientMounted]);

    const refreshAos = async () => {
        const aos = await import('aos');

        aos.refresh();
    };

    return [refreshAos] as const;
};

export const useContactForm = () => {
    const t = useTranslations('home-contact-form');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values: ContactData) => {
        setIsSubmitting(true);

        const { name, email, subject } = values;

        const notify = (
            color: NotificationProps['color'],
            message: NotificationProps['message']
        ) => {
            showNotification({
                id: 'contact-form-submitted',
                title: name ?? email,
                color,
                message
            });
        };

        try {
            const { csrfToken } = await getCsrfToken();

            await postSendEmail({
                ...values,
                subject: subject ?? '[Personal site] Contact form message',
                csrfToken
            });

            notify('green', t('submit-success'));
        } catch (error) {
            notify('red', t('submit-failure'));

            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    return [handleSubmit, isSubmitting] as const;
};
