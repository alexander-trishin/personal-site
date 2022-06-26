import { NotificationProps, showNotification } from '@mantine/notifications';
import ky from 'ky-universal';
import { useState } from 'react';

import { getBaseUrl } from 'shared/utils/url';

import { ContactData } from './Contact.types';

const submitNotificationOptions: Partial<NotificationProps> = {
    id: 'submit-contact-form',
    title: 'Contact'
};

export const useContactForm = (): [typeof handleSubmit, typeof isSubmitting] => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (json: ContactData) => {
        setIsSubmitting(true);

        try {
            await ky.post('/api/send-email', {
                prefixUrl: getBaseUrl(),
                json
            });

            showNotification({
                ...submitNotificationOptions,
                color: 'green',
                message: 'An email was successfully sent!'
            });
        } catch (error) {
            console.log(error);

            showNotification({
                ...submitNotificationOptions,
                color: 'red',
                message: 'Failed to send an email.'
            });
        }

        setIsSubmitting(false);
    };

    return [handleSubmit, isSubmitting];
};
