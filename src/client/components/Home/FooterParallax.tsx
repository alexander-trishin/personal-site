import { Box, createStyles } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';

import Footer from './Footer';

type FooterParallaxStyleParams = {
    height: number;
};

const useFooterParallaxStyles = createStyles((theme, { height }: FooterParallaxStyleParams) => ({
    overlay: {
        height
    },

    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }
}));

const FooterParallax = () => {
    const { ref, height } = useElementSize<HTMLDivElement>();

    const { classes } = useFooterParallaxStyles({ height: height || 100 });

    return (
        <>
            <Box className={classes.overlay} />
            <Footer ref={ref} className={classes.footer} />
        </>
    );
};

export default FooterParallax;
