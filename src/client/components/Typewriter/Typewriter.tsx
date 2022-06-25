import { Box, BoxProps } from '@mantine/core';
import { PropsWithoutRef, useCallback, useEffect, useRef } from 'react';
import Typed, { TypedOptions } from 'typed.js';

import { isClientSide } from 'shared/utils/dom';

type TypewriterProps = Omit<BoxProps<'span'>, 'component'>;

const Typewriter = (props: PropsWithoutRef<TypewriterProps>) => {
    const { children, ...rest } = props;

    const sourceRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLSpanElement>(null);

    const typedRef = useRef<Typed>();

    const restart = useCallback(() => {
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
    }, []);

    useEffect(() => {
        restart();

        return () => {
            typedRef.current?.destroy();
        };
    }, [children, restart]);

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
