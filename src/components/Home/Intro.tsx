import { Box, BoxProps, Button, Center, Container, createStyles, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';
import { GoChevronDown } from 'react-icons/go';

import { ThemeOther } from 'common/theme';

import Section from './Section';
import Social from './Social';
import Typewriter from './Typewriter';

type IntroProps = Omit<BoxProps<'section'>, 'component'> & {
    showMoreHref?: string;
};

const useIntroStyles = createStyles(theme => {
    const darkMode = theme.colorScheme === 'dark';
    const other = theme.other as ThemeOther;

    const primaryColor = other.fn.getPrimaryColor(theme);
    const socialSize = other.fn.clamp(26, 32);

    return {
        root: {
            position: 'relative',

            minHeight: 600,
            height: '100vh',

            [theme.fn.largerThan('sm')]: {
                minHeight: 660
            },

            [theme.fn.largerThan('md')]: {
                minHeight: 720
            }
        },

        image: {
            position: 'absolute',
            inset: 0,
            zIndex: -2
        },

        overlay: {
            position: 'absolute',
            inset: 0,
            zIndex: -1,

            background: darkMode ? theme.black : theme.white,
            opacity: 0.85
        },

        content: {
            height: '100%',
            width: '100%',

            transform: `translateY(-${theme.spacing.xs}px)`
        },

        hello: {
            fontFamily: theme.headings.fontFamily,
            fontWeight: 700,
            fontSize: other.fn.clamp(15, 23),
            letterSpacing: 2,

            color: primaryColor,
            margin: 0
        },

        name: {
            ...theme.headings.sizes.h1,
            fontWeight: 700,
            fontFamily: theme.headings.fontFamily,

            color: darkMode ? theme.white : theme.black,
            margin: 0
        },

        position: {
            fontSize: other.fn.clamp(14, 18),
            letterSpacing: 2,

            margin: 0
        },

        button: {
            fontFamily: theme.headings.fontFamily,
            letterSpacing: 2,

            height: 'auto',
            padding: theme.spacing.lg,

            background: 'transparent',
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: theme.colors.dark[darkMode ? 3 : 4],
            transition: 'border-color 300ms ease-in-out',

            ':focus, :hover': {
                borderColor: primaryColor,
                background: 'transparent'
            }
        },

        social: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: theme.spacing.xl * 3,

            textAlign: 'center',

            '> li > a': {
                minHeight: socialSize,
                minWidth: socialSize,
                height: socialSize,
                width: socialSize
            }
        }
    };
});

const Intro = forwardRef<HTMLDivElement, IntroProps>((props, ref) => {
    const { className, showMoreHref = '#', ...rest } = props;

    const { classes, cx } = useIntroStyles();

    return (
        <Section {...rest} ref={ref} className={cx(classes.root, className)}>
            <Image
                className={classes.image}
                src="/static/images/home/intro-bg.jpg"
                alt="Intro Background"
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
                        Hello, World.
                    </Text>

                    <Text component="h2" align="center" mb="sm" className={classes.name}>
                        I&apos;m Alexander Trishin.
                    </Text>

                    <Text align="center" transform="uppercase" mb="xl" className={classes.position}>
                        <Typewriter>
                            <p>Full-Stack Web Developer</p>
                            <p>Electric Guitar Player</p>
                            <p>Photographer</p>
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
                            More about me
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
