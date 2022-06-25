import { Box, BoxProps, Button, Center, Container, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';
import { GoChevronDown } from 'react-icons/go';

import useIntroStyles from './Intro.styles';
import Section from './Section';
import Social from './Social';
import Typewriter from './Typewriter';

type IntroProps = Omit<BoxProps<'section'>, 'component'> & {
    showMoreHref?: string;
};

const Intro = forwardRef<HTMLDivElement, IntroProps>((props, ref) => {
    const { className, showMoreHref = '#', ...rest } = props;

    const { classes, cx } = useIntroStyles();
    const t = useTranslations('home-intro');

    return (
        <Section {...rest} ref={ref} className={cx(classes.root, className)}>
            <Image
                className={classes.image}
                src="/static/images/home/intro-bg.jpg"
                alt={t('image')}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={25}
                priority
            />

            <Box className={classes.overlay} />

            <Center component={Container} size="lg" className={classes.content}>
                <Stack align="center" spacing={0}>
                    <Text
                        component="h1"
                        align="center"
                        transform="uppercase"
                        className={classes.hello}
                    >
                        {t('hello')}
                    </Text>

                    <Text component="h2" align="center" mb="sm" className={classes.name}>
                        {t('name')}
                    </Text>

                    <Text align="center" transform="uppercase" mb="xl" className={classes.position}>
                        <Typewriter>
                            <p>{t('position-1')}</p>
                            <p>{t('position-2')}</p>
                            <p>{t('position-3')}</p>
                            <p>{t('position-4')}</p>
                        </Typewriter>
                    </Text>

                    <Link href={showMoreHref} shallow replace passHref>
                        <Button
                            component="a"
                            variant="default"
                            radius="xs"
                            uppercase
                            rightIcon={<GoChevronDown />}
                            className={classes.button}
                            mt="xl"
                        >
                            {t('more')}
                        </Button>
                    </Link>
                </Stack>
            </Center>

            <Social className={classes.social} />
        </Section>
    );
});

Intro.displayName = 'Intro';

export default Intro;