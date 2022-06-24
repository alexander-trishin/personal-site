import Head from 'next/head';
import { PropsWithoutRef } from 'react';

type SearchEngineOptimizationProps = {
    title?: string;
};

const SearchEngineOptimization = (props: PropsWithoutRef<SearchEngineOptimizationProps>) => {
    const { title } = props;

    return (
        <Head>
            {title && (
                <>
                    <title key="title">{title}</title>
                    <meta key="og:title" name="og:title" content={title} />
                </>
            )}
        </Head>
    );
};

export default SearchEngineOptimization;
