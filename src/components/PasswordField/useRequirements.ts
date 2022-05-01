import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { PasswordRequirement, PasswordRequirementProps } from './PasswordField.types';

const useRequirements = (props: PasswordRequirementProps) => {
    const { requireMinLength = 0, requireNumber, requireLowercase, requireUppercase } = props;

    const t = useTranslations('password-field');

    const requirements = useMemo(() => {
        const result = new Array<PasswordRequirement>();

        if (requireMinLength > 0) {
            result.push({
                value: new RegExp(`.{${requireMinLength},}`),
                label: t('min', { limit: requireMinLength })
            });
        }

        if (requireNumber) result.push({ value: /[0-9]/, label: t('number') });
        if (requireLowercase) result.push({ value: /[a-z]/, label: t('lowercase') });
        if (requireUppercase) result.push({ value: /[A-Z]/, label: t('uppercase') });

        return result;
    }, [t, requireMinLength, requireNumber, requireLowercase, requireUppercase]);

    return requirements;
};

export default useRequirements;
