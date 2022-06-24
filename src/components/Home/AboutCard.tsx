import { Avatar, createStyles, Stack, Text } from '@mantine/core';
import { PropsWithoutRef } from 'react';
import { IconType } from 'react-icons';

type AboutCardProps = {
    icon: IconType;
    caption: string;
    message: string;
};

const useAboutCardStyles = createStyles(theme => ({
    caption: {
        fontFamily: theme.headings.fontFamily,
        ...theme.headings.sizes.h5
    }
}));

const AboutCard = (props: PropsWithoutRef<AboutCardProps>) => {
    const { icon: Icon, caption, message } = props;

    const { classes } = useAboutCardStyles();

    return (
        <Stack align="center" spacing={0}>
            <Avatar color="primary" size="lg" radius="xl" mb="sm">
                <Icon />
            </Avatar>
            <Text className={classes.caption} weight={500} mb="xs">
                {caption}
            </Text>
            <Text color="dimmed" align="center">
                {message}
            </Text>
        </Stack>
    );
};

export default AboutCard;
