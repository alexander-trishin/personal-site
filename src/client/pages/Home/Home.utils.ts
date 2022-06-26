import { NotificationProps, showNotification } from '@mantine/notifications';
import { useState } from 'react';

import { getCsrfToken, postSendEmail } from 'shared/requests';

import { ContactData } from './Contact.types';

const submitNotificationOptions: Partial<NotificationProps> = {
    id: 'submit-contact-form',
    title: 'Contact'
};

export const useContactForm = (): [typeof handleSubmit, typeof isSubmitting] => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values: ContactData) => {
        setIsSubmitting(true);

        try {
            const { csrfToken } = await getCsrfToken();

            await postSendEmail({
                ...values,
                csrfToken
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
