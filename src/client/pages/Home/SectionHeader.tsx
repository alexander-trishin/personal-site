import { Box, createStyles, Text } from '@mantine/core';
import { ComponentProps, PropsWithoutRef } from 'react';

type SectionHeaderProps = ComponentProps<typeof Box<'div'>> & {
    caption?: string;
    message?: string;
};

const useSectionHeaderStyles = createStyles(theme => {
    const primaryColor = theme.fn.primaryColor();

    return {
        text: {
            fontFamily: theme.headings.fontFamily,
            margin: 0
        },

        caption: {
            fontFamily: theme.headings.fontFamily,
            fontSize: theme.other.fn.clamp(14, 18),

            letterSpacing: 3,
            color: primaryColor,

            margin: 0
        },

        message: {
            fontSize: theme.headings.sizes.h3.fontSize,
            lineHeight: theme.headings.sizes.h3.lineHeight
        }
    };
});

const SectionHeader = (props: PropsWithoutRef<SectionHeaderProps>) => {
    const { caption, message, ...rest } = props;

    const { classes, cx } = useSectionHeaderStyles();

    return (
        <Box data-aos="fade-up" {...rest}>
            {caption && (
                <Text
                    component="h3"
                    weight={700}
                    align="center"
                    transform="uppercase"
                    className={cx(classes.text, classes.caption)}
                >
                    {caption}
                </Text>
            )}
            {message && (
                <Text
                    component="h4"
                    weight={700}
                    align="center"
                    className={cx(classes.text, classes.message)}
                >
                    {message}
                </Text>
            )}
        </Box>
    );
};

export default SectionHeader;
