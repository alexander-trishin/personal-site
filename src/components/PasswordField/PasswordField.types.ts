import type { PasswordInputProps } from '@mantine/core';

export type PasswordRequirement = {
    value: RegExp;
    label: string;
};

export interface PasswordRequirementProps {
    requireMinLength?: number;
    requireNumber?: boolean;
    requireLowercase?: boolean;
    requireUppercase?: boolean;
}

export interface PasswordFieldProps
    extends PasswordRequirementProps,
        Omit<PasswordInputProps, 'value'> {
    value?: string;
}
