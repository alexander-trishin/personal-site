import { isClientSide } from './dom';

export const getBaseUrl = () => {
    return isClientSide() ? '' : process.env.BASE_URL.trim();
};
