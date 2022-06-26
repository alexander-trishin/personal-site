import { Box, Center, Container, createStyles, SegmentedControl } from '@mantine/core';
import { ComponentProps, forwardRef, useState } from 'react';
import { TbCode, TbPhoto } from 'react-icons/tb';

import Section from './Section';

type PortfolioProps = ComponentProps<typeof Section>;

const usePortfolioStyles = createStyles(theme => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }
}));

const views = [
    {
        label: (
            <Center>
                <TbCode size={16} />
                <Box ml="xs">Projects</Box>
            </Center>
        ),
        value: 'projects'
    },
    {
        label: (
            <Center>
                <TbPhoto size={16} />
                <Box ml="xs">Photographies</Box>
            </Center>
        ),
        value: 'photos'
    }
];

const Portfolio = forwardRef<HTMLDivElement, PortfolioProps>((props, ref) => {
    const { className, ...rest } = props;

    const { classes, cx } = usePortfolioStyles();

    const [view, setView] = useState('projects');

    return (
        <Section {...rest} ref={ref} className={cx(classes.root, className)}>
            <Section.Header caption="Portfolio" message="Check Out Some of My Works." mb="xl" />

            <Container size="md" pt="xl">
                <Center>
                    <SegmentedControl value={view} onChange={setView} data={views} />
                </Center>

                <Box></Box>
            </Container>
        </Section>
    );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
