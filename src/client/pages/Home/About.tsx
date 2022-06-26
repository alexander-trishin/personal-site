import { Avatar, Container, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ComponentProps, forwardRef } from 'react';
import { TbCode, TbPhoto, TbFileText } from 'react-icons/tb';

import useAboutStyles from './About.styles';
import AboutCard from './AboutCard';
import Section from './Section';

type AboutProps = ComponentProps<typeof Section>;

const About = forwardRef<HTMLDivElement, AboutProps>((props, ref) => {
    const { classes, cx } = useAboutStyles();
    const t = useTranslations('home-about');

    return (
        <Section {...props} ref={ref}>
            <Section.Header caption={t('caption')} message={t('caption-description')} mb="xl" />

            <Container className={cx(classes.container, classes.info)}>
                <Avatar
                    className={classes.avatar}
                    classNames={{ placeholder: classes.avatarPlaceholder }}
                    size="xl"
                    my="xl"
                >
                    <Image
                        src="/static/images/home/author.jpg"
                        alt={t('author-avatar')}
                        layout="fill"
                    />
                </Avatar>
                <Text className={classes.message} color="dimmed" px="xl">
                    {t('author-message')}
                </Text>
            </Container>

            <Container className={cx(classes.container, classes.overview)}>
                <AboutCard
                    icon={TbCode}
                    caption={t('card-projects-caption')}
                    message={t('card-projects-message')}
                />
                <AboutCard
                    icon={TbPhoto}
                    caption={t('card-photos-caption')}
                    message={t('card-photos-message')}
                />
                <AboutCard
                    icon={TbFileText}
                    caption={t('card-blog-caption')}
                    message={t('card-blog-message')}
                />
            </Container>
        </Section>
    );
});

About.displayName = 'About';

export default About;
