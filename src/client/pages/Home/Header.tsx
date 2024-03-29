import {
    Box,
    Burger,
    Button,
    Container,
    createStyles,
    Group,
    Paper,
    Stack,
    Transition
} from '@mantine/core';
import { useMediaQuery, useScrollLock, useWindowScroll } from '@mantine/hooks';
import Link from 'next/link';
import { ComponentProps, MouseEventHandler, PropsWithoutRef, useRef, useState } from 'react';

import { ColorSchemeToggle, LanguagePicker, Logo } from 'client/components';
import { ZIndex } from 'client/constants';

type NavLink = {
    label: string;
    href: string;
};

type HeaderProps = Omit<ComponentProps<typeof Box<'header'>>, 'component'> & {
    navLinks?: NavLink[];
    onThemeToggle?: MouseEventHandler<HTMLButtonElement>;
    stackY?: number;
};

type HeaderStyleProps = Pick<HeaderProps, 'stackY'> & {
    headerHeight?: number;
    scrollY: number;
};

const useHeaderStyles = createStyles(
    (theme, { headerHeight = 0, scrollY, stackY }: HeaderStyleProps) => ({
        root: {
            width: '100%',

            backgroundColor: 'transparent',
            boxShadow: 'none',

            ...(typeof stackY === 'number' && {
                position: 'fixed',
                zIndex: ZIndex.Header,

                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

                ...(scrollY > stackY && {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                    boxShadow: theme.shadows.sm
                })
            })
        },

        navLink: {
            fontFamily: theme.headings.fontFamily,
            fontWeight: 500,

            backgroundColor: 'transparent',
            border: 0
        },

        sidebar: {
            position: 'fixed',
            zIndex: ZIndex.Sidebar,

            inset: 0,
            top: headerHeight,

            overflow: 'hidden'
        }
    })
);

const useSidebar = (isMobile?: boolean): [boolean, () => void] => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [_, setIsScrollLocked] = useScrollLock(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevIsSidebarOpen => {
            if (isMobile) {
                setIsScrollLocked(!prevIsSidebarOpen);
            }

            return !prevIsSidebarOpen;
        });
    };

    return [isSidebarOpen, toggleSidebar];
};

const Header = (props: PropsWithoutRef<HeaderProps>) => {
    const { className, children, navLinks = [], onThemeToggle, stackY, ...rest } = props;

    const headerRef = useRef<HTMLDivElement>(null);
    const [scroll] = useWindowScroll();

    const { classes, cx, theme } = useHeaderStyles({
        headerHeight: headerRef.current?.clientHeight,
        scrollY: scroll.y,
        stackY
    });

    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`, true);

    const [isSidebarOpen, toggleSidebar] = useSidebar(isMobile);

    const links = navLinks.map(({ label, href }) => (
        <Link key={label} href={href} shallow replace passHref>
            <Button
                component="a"
                variant="default"
                onClick={toggleSidebar}
                className={classes.navLink}
            >
                {label}
            </Button>
        </Link>
    ));

    return (
        <Box {...rest} component="header" ref={headerRef} className={cx(classes.root, className)}>
            <Container size="lg" py="sm">
                <Group position="apart">
                    {isMobile && links.length > 0 ? (
                        <Burger opened={isSidebarOpen} onClick={toggleSidebar} />
                    ) : (
                        <Logo />
                    )}

                    <Group spacing="xl">
                        {!isMobile && (
                            <Group spacing={0} mr="xl">
                                {links}
                            </Group>
                        )}

                        <Group spacing="md" ml="xl">
                            <LanguagePicker />
                            <ColorSchemeToggle onClick={onThemeToggle} />
                        </Group>
                    </Group>
                </Group>
            </Container>

            {isMobile && (
                <Transition mounted={isSidebarOpen} transition="slide-right" duration={300}>
                    {styles => (
                        <Paper radius={0} withBorder className={classes.sidebar} style={styles}>
                            <Stack p="lg">{links}</Stack>
                        </Paper>
                    )}
                </Transition>
            )}
        </Box>
    );
};

export default Header;
