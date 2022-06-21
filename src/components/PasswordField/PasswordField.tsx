import { PasswordInput, PasswordInputProps, Progress } from '@mantine/core';
import { ChangeEventHandler, PropsWithoutRef, useState } from 'react';

import useProgress from './useProgress';
import useRequirements from './useRequirements';

type PasswordFieldProps = Omit<PasswordInputProps, 'value'> & {
    minStrength?: number;
    showStrength?: boolean;
    value?: string;
};

const PasswordField = (props: PropsWithoutRef<PasswordFieldProps>) => {
    const { value: valueFromProps, minStrength, onChange, showStrength, ...rest } = props;

    const [value, setValue] = useState(valueFromProps ?? '');

    const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
        const { value: newValue } = event.currentTarget;

        onChange?.(event) ?? setValue(newValue);
    };

    const requirements = useRequirements(minStrength);
    const { color, strength } = useProgress(requirements, value);

    return (
        <>
            <PasswordInput {...rest} value={value} onChange={handleChange} />
            {showStrength && value.length > 0 && (
                <Progress color={color} value={strength} size={5} />
            )}
        </>
    );
};

export default PasswordField;
