import { Box, Button, Textarea, TextInput, TextInputProps } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { ComponentProps, PropsWithoutRef } from 'react';
import { z } from 'zod';

import { useFormTranslationFix } from 'client/hooks';
import { trim } from 'shared/utils/string';

import { ContactData, ContactFormBaseProps } from './Contact.types';

type ContactFormProps = Omit<ComponentProps<typeof Box<'form'>>, 'component' | 'onSubmit'> &
    ContactFormBaseProps;

const useContactFormSchema = () => {
    const t = useTranslations('validation');

    const schema = zodResolver(
        z.object({
            name: z.optional(z.preprocess(trim, z.string().max(64, t('max', { limit: 64 })))),
            email: z.preprocess(
                trim,
                z
                    .string()
                    .min(5, t('required'))
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
        })
    );

    return [schema, t] as const;
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

const getAosProps = (type: 'input' | 'button' = 'input') => ({
    'data-aos': 'fade-left',
    'data-aos-duration': 750,
    ...(type === 'input' && {
        errorProps: {
            'data-aos': 'zoom-in',
            'data-aos-duration': 300
        }
    })
});

const ContactForm = (props: PropsWithoutRef<ContactFormProps>) => {
    const { isSubmitting: isLoading, onSubmit, ...rest } = props;

    const t = useTranslations('home-contact-form');
    const [validate, tv] = useContactFormSchema();

    const form = useForm<ContactData>({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validate
    });

    useFormTranslationFix(form, tv);

    const handleSubmit = form.onSubmit(async ({ name, subject, ...values }) => {
        try {
            const handle = onSubmit?.({
                ...values,
                ...(name && { name }),
                ...(subject && { subject })
            });

            if (handle instanceof Promise) {
                await handle;
            }

            form.reset();
        } catch (error) {
            // Do nothing
        }
    });

    return (
        <Box {...rest} component="form" onSubmit={handleSubmit}>
            <TextInput
                {...form.getInputProps('name')}
                styles={inputStyles}
                placeholder={t('name')}
                disabled={isLoading}
                mb="xs"
                {...getAosProps()}
            />

            <TextInput
                {...form.getInputProps('email')}
                styles={inputStyles}
                placeholder={t('email')}
                disabled={isLoading}
                mb="xs"
                {...getAosProps()}
                data-aos-delay={100}
            />

            <TextInput
                {...form.getInputProps('subject')}
                styles={inputStyles}
                placeholder={t('subject')}
                disabled={isLoading}
                mb="xs"
                {...getAosProps()}
                data-aos-delay={200}
            />

            <Textarea
                {...form.getInputProps('message')}
                styles={inputStyles}
                minRows={5}
                placeholder={t('message')}
                disabled={isLoading}
                mb="xl"
                {...getAosProps()}
                data-aos-delay={300}
            />

            <Button
                type="submit"
                radius="xs"
                size="md"
                uppercase
                fullWidth
                loading={isLoading}
                {...getAosProps('button')}
                data-aos-delay={400}
                data-aos-offset={0}
            >
                {t('submit')}
            </Button>
        </Box>
    );
};

export default ContactForm;
