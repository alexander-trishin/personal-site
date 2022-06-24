import type { PasswordInputProps } from '@mantine/core';

export interface PasswordFieldProps extends Omit<PasswordInputProps, 'value'> {
    value?: string;
    showStrength?: number;
}
