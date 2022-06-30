import { Container, createStyles, Grid, Skeleton, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { ComponentProps, forwardRef, lazy, Suspense } from 'react';

import { ContactFormBaseProps } from './Contact.types';
import Section from './Section';

const ContactForm = lazy(() => import('./ContactForm'));
const PersonalEmailImage = lazy(() => import('client/assets/svg/PersonalEmail'));

type ContactProps = Omit<ComponentProps<typeof Section>, 'onSubmit'> & ContactFormBaseProps;

const useContactStyles = createStyles(theme => ({
    container: {
        maxWidth: theme.breakpoints.xs,

        [theme.fn.largerThan('sm')]: {
            maxWidth: theme.breakpoints.lg
        }
    },

    image: {
        display: 'none',

        [theme.fn.largerThan('sm')]: {
            display: 'block'
        }
    },

    form: {
        [theme.fn.largerThan('md')]: {
            padding: `0 ${theme.spacing.xl * 2}px`
        }
    }
}));

const Contact = forwardRef<HTMLDivElement, ContactProps>((props, ref) => {
    const { isSubmitting, onSubmit, ...rest } = props;

    const { classes } = useContactStyles();
    const t = useTranslations('home-contact');

    return (
        <Section {...rest} ref={ref}>
            <Section.Header caption={t('caption')} message={t('caption-description')} mb="xl" />

            <Container px="xl" pt="xl" className={classes.container}>
                <Grid grow align="center" justify="center" gutter="xl" mt="xl">
                    <Grid.Col span={5} p="xl" className={classes.image}>
                        <Suspense fallback={<Skeleton />}>
                            <PersonalEmailImage />
                        </Suspense>
                    </Grid.Col>
                    <Grid.Col xs={12} sm={7} className={classes.form}>
                        <Suspense
                            fallback={
                                <Stack spacing="xs">
                                    <Skeleton height={36} />
                                    <Skeleton height={36} />
                                    <Skeleton height={36} />
                                    <Skeleton height={100} />
                                    <Skeleton height={36} mt={14} />
                                </Stack>
                            }
                        >
                            <ContactForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
                        </Suspense>
                    </Grid.Col>
                </Grid>
            </Container>
        </Section>
    );
});

Contact.displayName = 'Contact';

export default Contact;
