import {
    Box,
    BoxProps,
    Burger,
    Button,
    Container,
    createStyles,
    Group,
    Paper,
    Stack,
    Transition,
    useMantineTheme
} from '@mantine/core';
import { useMediaQuery, useScrollLock, useWindowScroll } from '@mantine/hooks';
import { MouseEvent, PropsWithoutRef, useRef, useState } from 'react';

import { ColorSchemeToggle } from 'components';
import { Logo } from 'components/Logo';

type NavLink = {
    label: string;
    href: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

type HeaderProps = Omit<BoxProps<'header'>, 'component'> & {
    navLinks?: NavLink[];
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
                zIndex: 100,

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
            zIndex: 100,

            inset: 0,
            top: headerHeight,

            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderTopWidth: 0,
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
    const { className, children, navLinks = [], stackY, ...rest } = props;

    const headerRef = useRef<HTMLDivElement>(null);
    const [scroll] = useWindowScroll();

    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`, true);

    const { classes, cx } = useHeaderStyles({
        headerHeight: headerRef.current?.clientHeight,
        scrollY: scroll.y,
        stackY
    });

    const [isSidebarOpen, toggleSidebar] = useSidebar(isMobile);

    const links = navLinks.map(({ label, href, onClick }) => {
        const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
            toggleSidebar();

            onClick?.(event);
        };

        return (
            <Button
                key={label}
                className={classes.navLink}
                variant="default"
                component="a"
                href={href}
                onClick={handleClick}
            >
                {label}
            </Button>
        );
    });

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

                        <ColorSchemeToggle variant="default" size={30} ml="xl" />
                    </Group>
                </Group>
            </Container>

            {isMobile && (
                <Transition mounted={isSidebarOpen} transition="slide-right" duration={300}>
                    {styles => (
                        <Paper withBorder className={classes.sidebar} style={styles}>
                            <Stack p="lg">{links}</Stack>
                        </Paper>
                    )}
                </Transition>
            )}
        </Box>
    );
};

export default Header;
