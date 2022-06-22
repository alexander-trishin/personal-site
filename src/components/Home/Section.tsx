import { Box, BoxProps, createStyles } from '@mantine/core';
import { forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

import SectionHeader from './SectionHeader';

type SectionProps = Omit<BoxProps<'section'>, 'component'>;

type SectionComponent = ForwardRefExoticComponent<
    PropsWithoutRef<SectionProps> & RefAttributes<HTMLDivElement>
> & {
    Header: typeof SectionHeader;
};

const useSectionStyles = createStyles(theme => ({
    root: {
        paddingTop: theme.spacing.xl * 5,
        paddingBottom: theme.spacing.xl * 3
    }
}));

const Section = forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
    const { className, children, ...rest } = props;

    const { classes, cx } = useSectionStyles();

    return (
        <Box {...rest} component="section" ref={ref} className={cx(classes.root, className)}>
            {children}
        </Box>
    );
}) as SectionComponent;

Section.displayName = 'Section';
Section.Header = SectionHeader;

export default Section;
