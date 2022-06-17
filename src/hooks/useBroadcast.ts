import { useCallback, useEffect, useRef } from 'react';

export type BroadcastHandler<T> = (event: MessageEvent<T>) => void;

const useBroadcast = <T>(name: string, handler: BroadcastHandler<T>) => {
    const ref = useRef<BroadcastChannel>();

    const getChannel = useCallback(() => (ref.current ??= new BroadcastChannel(name)), [name]);

    const broadcast = useCallback((message: T) => getChannel().postMessage(message), [getChannel]);

    useEffect(() => {
        const channel = getChannel();

        channel.addEventListener('message', handler);

        return () => channel.removeEventListener('message', handler);
    }, [getChannel, handler]);

    return broadcast;
};

export default useBroadcast;
