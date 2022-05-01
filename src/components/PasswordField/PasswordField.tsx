import { PasswordInput, Popover, Progress } from '@mantine/core';
import { ChangeEventHandler, PropsWithoutRef, useState } from 'react';

import { PasswordFieldProps } from './PasswordField.types';
import PasswordFieldRequirement from './PasswordFieldRequirement';
import useProgress from './useProgress';
import useRequirements from './useRequirements';

const PasswordField = (props: PropsWithoutRef<PasswordFieldProps>) => {
    const {
        value: valueFromProps,
        onChange,
        requireMinLength,
        requireNumber,
        requireLowercase,
        requireUppercase,
        ...rest
    } = props;

    const requirements = useRequirements({
        requireMinLength,
        requireNumber,
        requireLowercase,
        requireUppercase
    });

    const [showPopover, setShowPopover] = useState(false);

    const handleShowPopover = () => setShowPopover(requirements.length > 0 && value.length > 0);
    const handleHidePopover = () => setShowPopover(false);

    const [value, setValue] = useState(valueFromProps ?? '');

    const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
        const { value: newValue } = event.currentTarget;

        setShowPopover(requirements.length > 0 && newValue.length > 0 && strength < 100);
        onChange?.(event) ?? setValue(newValue);
    };

    const { color, strength } = useProgress(requirements, value);

    return (
        <Popover
            target={
                <PasswordInput {...rest} value={valueFromProps ?? value} onChange={handleChange} />
            }
            opened={showPopover}
            trapFocus={false}
            onFocusCapture={handleShowPopover}
            onBlurCapture={handleHidePopover}
            position="bottom"
            placement="center"
            transition="pop-top-left"
            styles={{ popover: { userSelect: 'none', width: '100%' } }}
            withArrow
        >
            <Progress color={color} value={strength} size={5} mb="md" />
            {requirements.map(requirement => {
                const done = requirement.value.test(value);

                return (
                    <PasswordFieldRequirement key={`${requirement.label}${done}`} done={done}>
                        {requirement.label}
                    </PasswordFieldRequirement>
                );
            })}
        </Popover>
    );
};

export default PasswordField;
