import { Box, BoxProps, createStyles, Text } from '@mantine/core';
import { PropsWithoutRef } from 'react';

import { ThemeOther } from 'common/theme';

type SectionHeaderProps = BoxProps<'div'> & {
    caption?: string;
    message?: string;
};

const useSectionHeaderStyles = createStyles(theme => {
    const other = theme.other as ThemeOther;
    const primaryColor = other.fn.getPrimaryColor(theme);

    return {
        text: {
            fontFamily: theme.headings.fontFamily,
            margin: 0
        },

        caption: {
            fontFamily: theme.headings.fontFamily,
            fontSize: other.fn.clamp(14, 18),

            letterSpacing: 3,
            color: primaryColor,

            margin: 0
        },

        message: {
            ...theme.headings.sizes.h3
        }
    };
});

const SectionHeader = (props: PropsWithoutRef<SectionHeaderProps>) => {
    const { caption, message, ...rest } = props;

    const { classes } = useSectionHeaderStyles();

    return (
        <Box {...rest}>
            {caption && (
                <Text
                    component="h3"
                    weight={700}
                    align="center"
                    transform="uppercase"
                    className={classes.caption}
                >
                    {caption}
                </Text>
            )}
            {message && (
                <Text component="h4" weight={700} align="center" className={classes.message}>
                    {message}
                </Text>
            )}
        </Box>
    );
};

export default SectionHeader;
