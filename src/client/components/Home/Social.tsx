import { ActionIcon, createStyles } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, PropsWithoutRef } from 'react';
import { FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';

type SocialProps = HTMLAttributes<HTMLUListElement>;

const useSocialStyles = createStyles(theme => ({
    list: {
        margin: 0,
        padding: 0,

        listStyle: 'none',
        listStyleType: 'disc',

        color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[7]
    },

    listItem: {
        display: 'inline-block',

        margin: `0 ${theme.spacing.sm}px`
    },

    anchor: {
        color: 'inherit',

        transitionProperty: 'color',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease',

        ':focus, :hover': {
            color: theme.colors[theme.primaryColor][6]
        }
    }
}));

const Social = (props: PropsWithoutRef<SocialProps>) => {
    const { className, ...rest } = props;

    const { classes, cx } = useSocialStyles();
    const t = useTranslations('social');

    const links = [
        {
            title: t('linkedin'),
            icon: FaLinkedinIn,
            address: 'https://www.linkedin.com/in/trishinalexander'
        },
        { title: t('github'), icon: FaGithub, address: 'https://github.com/alexander-trishin' },
        {
            title: t('instagram'),
            icon: FaInstagram,
            address: 'https://www.instagram.com/effecto.exe'
        }
    ];

    return (
        <ul {...rest} className={cx(classes.list, className)}>
            {links.map(({ title, icon: Icon, address }) => (
                <li key={title} className={classes.listItem}>
                    <ActionIcon
                        component="a"
                        className={classes.anchor}
                        variant="transparent"
                        href={address}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title}
                    >
                        <Icon size="100%" />
                    </ActionIcon>
                </li>
            ))}
        </ul>
    );
};

export default Social;
