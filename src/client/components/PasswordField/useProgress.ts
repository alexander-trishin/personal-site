import { DefaultMantineColor } from '@mantine/core';
import { useMemo } from 'react';

const useProgress = (requirements: RegExp[], value: string) => {
    const strength = useMemo(() => {
        let multiplier = value.length > 5 ? 0 : 1;

        requirements.forEach(requirement => {
            if (!requirement.test(value)) {
                multiplier += 1;
            }
        });

        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
    }, [requirements, value]);

    const color: DefaultMantineColor = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    return {
        color,
        strength
    };
};

export default useProgress;
