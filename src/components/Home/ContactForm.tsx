import { Box, Button, Textarea, TextInput, TextInputProps } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { trim } from 'utils/common/form';

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

const ContactForm = () => {
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
        <Box component="form" onSubmit={handleSubmit}>
            <TextInput
                {...form.getInputProps('name')}
                styles={inputStyles}
                placeholder="Name"
                mb="xs"
            />

            <TextInput
                {...form.getInputProps('email')}
                styles={inputStyles}
                placeholder="Email"
                mb="xs"
            />

            <TextInput
                {...form.getInputProps('subject')}
                styles={inputStyles}
                placeholder="Subject"
                mb="xs"
            />

            <Textarea
                {...form.getInputProps('message')}
                styles={inputStyles}
                minRows={5}
                placeholder="Message"
                mb="xl"
            />

            <Button type="submit" radius="xs" size="md" uppercase fullWidth>
                Submit
            </Button>
        </Box>
    );
};

export default ContactForm;
