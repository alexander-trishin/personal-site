import { useMemo } from 'react';

const useRequirements = (minStrength?: number | null) => {
    const requirements = useMemo(() => {
        const result = new Array<RegExp>();

        if (minStrength) {
            result.push(new RegExp(`.{${minStrength},}`));
        }

        result.push(/[0-9]/);
        result.push(/[a-z]/);
        result.push(/[A-Z]/);

        return result;
    }, [minStrength]);

    return requirements;
};

export default useRequirements;
