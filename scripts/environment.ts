export const dev = process.env.NODE_ENV !== 'production';
export const hostname = process.env.HOSTNAME || 'localhost';
export const port = +(process.env.PORT || 3000);
