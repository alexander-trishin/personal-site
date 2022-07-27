import { Box, Global } from '@mantine/core';
import { ComponentProps, PropsWithoutRef, useCallback, useEffect, useRef, useState } from 'react';
import Typed, { TypedOptions } from 'typed.js';

import { isClientSide } from 'shared/utils/dom';

type TypedProps = Pick<TypedOptions, 'backDelay' | 'backSpeed' | 'startDelay' | 'typeSpeed'>;
type TypewriterProps = Omit<ComponentProps<typeof Box<'span'>>, 'component'> & TypedProps;

const Typewriter = (props: PropsWithoutRef<TypewriterProps>) => {
    const {
        children,
        className,
        backDelay = 2000,
        backSpeed = 30,
        startDelay = 0,
        typeSpeed = 60,
        ...rest
    } = props;

    const sourceRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLSpanElement>(null);

    const typedRef = useRef<Typed>();

    const [isStarted, setIsStarted] = useState(false);

    const restart = useCallback(() => {
        if (isClientSide()) {
            setIsStarted(false);

            const options: TypedOptions = {
                stringsElement: sourceRef.current!,
                startDelay,
                typeSpeed,
                backSpeed,
                backDelay,
                loop: true
            };

            setTimeout(() => setIsStarted(true), startDelay);
            typedRef.current = new Typed(targetRef.current!, options);
        }
    }, [backDelay, backSpeed, startDelay, typeSpeed]);

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

            <Global
                styles={{
                    '.typed-cursor': {
                        visibility: isStarted ? 'visible' : 'hidden'
                    }
                }}
            />
        </>
    );
};

export default Typewriter;
