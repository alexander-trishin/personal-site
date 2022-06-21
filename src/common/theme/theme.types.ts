import type { MantineProviderProps } from '@mantine/core';

import { ThemeOther } from './theme.other';

export type Theme = Omit<Required<MantineProviderProps>['theme'], 'other'> & {
    other: ThemeOther;
};

export type DefaultProps = Required<MantineProviderProps>['defaultProps'];
