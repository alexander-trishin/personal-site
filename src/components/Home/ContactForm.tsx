import { Box, BoxProps, Button, Textarea, TextInput, TextInputProps } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { PropsWithoutRef } from 'react';
import { z } from 'zod';

import { trim } from 'utils/common/form';

type ContactFormProps = Omit<BoxProps<'form'>, 'component' | 'onSubmit'>;

const createSchema = (t: ReturnType<typeof useTranslations>) => {
    return z.object({
        name: z.optional(z.preprocess(trim, z.string().max(64, t('max', { limit: 64 })))),
        email: z.preprocess(
            trim,
            z
                .string()
                .min(1, t('required'))
                .max(64, t('max', { limit: 64 }))
                .email(t('invalid'))
        ),
        subject: z.preprocess(
            trim,
            z
                .string()
                .min(1, t('required'))
                .max(128, t('max', { limit: 128 }))
        ),
        message: z.preprocess(
            trim,
            z
                .string()
                .min(8, t('min', { limit: 8 }))
                .max(2048, t('max', { limit: 2048 }))
        )
    });
};

const inputStyles: TextInputProps['styles'] = {
    input: {
        borderRadius: 0,
        borderLeft: 0,
        borderTop: 0,
        borderRight: 0
    },

    error: {
        textAlign: 'center'
    }
};

const ContactForm = (props: PropsWithoutRef<ContactFormProps>) => {
    const t = useTranslations('home-contact-form');
    const tv = useTranslations('validation');

    const form = useForm({
        schema: zodResolver(createSchema(tv)),
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    });

    const handleSubmit = form.onSubmit(() => {});

    return (
        <Box {...props} component="form" onSubmit={handleSubmit}>
            <TextInput
                {...form.getInputProps('name')}
                styles={inputStyles}
                placeholder={t('name')}
                mb="xs"
            />

            <TextInput
                {...form.getInputProps('email')}
                styles={inputStyles}
                placeholder={t('email')}
                mb="xs"
            />

            <TextInput
                {...form.getInputProps('subject')}
                styles={inputStyles}
                placeholder={t('subject')}
                mb="xs"
            />

            <Textarea
                {...form.getInputProps('message')}
                styles={inputStyles}
                minRows={5}
                placeholder={t('message')}
                mb="xl"
            />

            <Button type="submit" radius="xs" size="md" uppercase fullWidth>
                {t('submit')}
            </Button>
        </Box>
    );
};

export default ContactForm;
