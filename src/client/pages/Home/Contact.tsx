import { Container, createStyles, Grid } from '@mantine/core';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { ComponentProps, forwardRef } from 'react';

import { ContactFormBaseProps } from './Contact.types';
import ContactForm from './ContactForm';
import Section from './Section';

const PersonalEmailImage = dynamic(() => import('client/assets/svg/PersonalEmail'));

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
    const { isSubmitting: isLoading, onSubmit, ...rest } = props;

    const { classes } = useContactStyles();
    const t = useTranslations('home-contact');

    return (
        <Section {...rest} ref={ref}>
            <Section.Header caption={t('caption')} message={t('caption-description')} mb="xl" />

            <Container px="xl" pt="xl" className={classes.container}>
                <Grid grow align="center" justify="center" gutter="xl" mt="xl">
                    <Grid.Col span={5} p="xl" className={classes.image}>
                        <PersonalEmailImage />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={7}>
                        <ContactForm
                            className={classes.form}
                            isSubmitting={isLoading}
                            onSubmit={onSubmit}
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </Section>
    );
});

Contact.displayName = 'Contact';

export default Contact;
