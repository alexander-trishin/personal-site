import { createStyles } from '@mantine/core';

import { HeaderZIndex } from 'common/constants';

const useStyles = createStyles(() => ({
    root: {
        position: 'relative',
        zIndex: HeaderZIndex
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
    }
}));

export default useStyles;
