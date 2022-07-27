import { ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { ComponentProps, forwardRef } from 'react';

type MenuLinkProps = Omit<ComponentProps<typeof ActionIcon<'a'>>, 'component' | 'lang' | 'size'> & {
    href: string;
    locale?: string;
};

const MenuLink = forwardRef<HTMLAnchorElement, MenuLinkProps>((props, ref) => {
    const { children, href, locale, ...rest } = props;

    return (
        <Link href={href} replace locale={locale} scroll={false} passHref>
            <ActionIcon {...rest} component="a" ref={ref} lang={locale} size={40}>
                {children}
            </ActionIcon>
        </Link>
    );
});

MenuLink.displayName = 'MenuLink';

export default MenuLink;
