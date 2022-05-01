import type { FC } from 'react';

import { Box, Text } from '@mantine/core';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface PasswordRequirementProps {
    done?: boolean;
}

const PasswordRequirement: FC<PasswordRequirementProps> = props => {
    const { children, done } = props;

    return (
        <Text
            color={done ? 'teal' : 'red'}
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {done ? <FaCheck /> : <FaTimes />} <Box ml={10}>{children}</Box>
        </Text>
    );
};

export default PasswordRequirement;
