import { ActionIcon, ActionIconProps, Affix, createStyles, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import Link from 'next/link';
import { PropsWithoutRef } from 'react';
import { VscArrowUp } from 'react-icons/vsc';

import { ZIndex } from 'client/constants';

type OmitActionIconProps = 'component' | 'variant' | 'color' | 'size' | 'radius' | 'style';
type BackToTopButtonProps = Omit<ActionIconProps<'a'>, OmitActionIconProps>;

const useBackToTopButtonStyles = createStyles(theme => ({
    button: {
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`
    }
}));

const BackToTopButton = (props: PropsWithoutRef<BackToTopButtonProps>) => {
    const { className, href = '#', ...rest } = props;

    const { classes, cx } = useBackToTopButtonStyles();
    const [scroll] = useWindowScroll();

    return (
        <Affix zIndex={ZIndex.BackToTop} position={{ bottom: 20, right: 20 }}>
            <Transition transition="slide-up" mounted={scroll.y > 300}>
                {styles => (
                    <Link href={href} shallow replace passHref>
                        <ActionIcon
                            {...rest}
                            className={cx(classes.button, className)}
                            component="a"
                            variant="filled"
                            color="primary"
                            size="xl"
                            radius="xs"
                            style={styles}
                        >
                            <VscArrowUp />
                        </ActionIcon>
                    </Link>
                )}
            </Transition>
        </Affix>
    );
};

export default BackToTopButton;
