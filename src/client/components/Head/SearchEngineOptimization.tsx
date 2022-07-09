import Head from 'next/head';
import { PropsWithoutRef } from 'react';

import { OpenGraph } from './SearchEngineOptimization.types';

type SearchEngineOptimizationProps = {
    title?: string;
    description?: string;
    openGraph?: OpenGraph;
};

const SearchEngineOptimization = (props: PropsWithoutRef<SearchEngineOptimizationProps>) => {
    const { title, description, openGraph } = props;

    const {
        type: ogType = 'website',
        title: ogTitle = title,
        description: ogDescription = description
    } = openGraph ?? {};

    return (
        <Head>
            {title && <title key="title">{title}</title>}
            {description && <meta name="description" content={description} key="description" />}

            <meta property="og:type" content={ogType} key="og:type" />
            {ogTitle && <meta property="og:title" content={ogTitle} key="og:title" />}
            {ogDescription && (
                <meta property="og:description" content={description} key="og:description" />
            )}

            <meta
                name="google-site-verification"
                content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
                key="google-site-verification"
            />
        </Head>
    );
};

export default SearchEngineOptimization;
