import { ActionIcon, Group, Menu, createStyles } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { VscChevronDown } from 'react-icons/vsc';

import FlagRu from 'client/assets/svg/FlagRu';
import FlagUs from 'client/assets/svg/FlagUs';

import MenuLink from './MenuLink';

const useLanguagePickerStyles = createStyles(() => ({
    control: {
        backgroundColor: 'transparent',

        minHeight: 30,
        height: 30,
        minWidth: 50,
        width: 50
    }
}));

const localeIconMap = {
    ru: FlagRu,
    en: FlagUs
};

const LanguagePicker = () => {
    const t = useTranslations('i18n');
    const { classes } = useLanguagePickerStyles();
    const { locale, asPath } = useRouter();

    const LocaleIcon = localeIconMap[locale as keyof typeof localeIconMap];

    const items = Object.entries(localeIconMap).map(([key, Icon]) => (
        <Menu.Item key={key} component={MenuLink} href={asPath} locale={key} title={t(key)} p="xs">
            <Icon height="100%" width="100%" />
        </Menu.Item>
    ));

    return (
        <Menu
            control={
                <ActionIcon className={classes.control} variant="default">
                    <Group spacing={3}>
                        <LocaleIcon height={16} width={16} />
                        <VscChevronDown size={16} />
                    </Group>
                </ActionIcon>
            }
            menuButtonLabel={t('select-language')}
            size={50}
            transition="pop"
            placement="end"
            closeOnItemClick
            withArrow
            withinPortal
        >
            {items}
        </Menu>
    );
};

export default LanguagePicker;
