import { Box, BoxProps } from '@mantine/core';
import { PropsWithoutRef, useEffect, useRef } from 'react';
import Typed, { TypedOptions } from 'typed.js';

import { isClientSide } from 'utils/common/dom';

type TypewriterProps = Omit<BoxProps<'span'>, 'component'>;

const Typewriter = (props: PropsWithoutRef<TypewriterProps>) => {
    const { children, ...rest } = props;

    const sourceRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLSpanElement>(null);

    const typedRef = useRef<Typed>();

    useEffect(() => {
        if (isClientSide()) {
            const options: TypedOptions = {
                stringsElement: sourceRef.current!,
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            };

            typedRef.current = new Typed(targetRef.current!, options);
        }

        return () => {
            typedRef.current?.destroy();
        };
    }, []);

    return (
        <>
            <Box {...rest} component="span" ref={targetRef} />
            <Box ref={sourceRef} sx={{ display: 'none' }}>
                {children}
            </Box>
        </>
    );
};

export default Typewriter;
