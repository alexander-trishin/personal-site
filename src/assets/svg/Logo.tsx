import { SvgProps, useSvgTheme } from 'assets/svg/utils';

const Authentication = (props: SvgProps) => {
    const { isDarkMode, black, white } = useSvgTheme();

    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                fill={isDarkMode ? white : black}
                fillRule="evenodd"
                d="M56.4 0A57 57 0 0 0 0 57.7v396.6A57 57 0 0 0 56.4 512h399.2a57 57 0 0 0 56.4-57.7V57.7A57 57 0 0 0 455.6 0H56.4Zm399.8 126.3c10-.7 14 1.3 16.9 6.8 1.8 3.6 2.1 5.5 1.7 12.5-.4 6.8-1 9-3.1 12.2-3.3 5.1-6.7 6.3-27.7 9.6-19.8 3.1-34.9 6.7-38.5 9-6.4 4.2-7.6 16.6-5 51.1 3 42.3 5.4 63.7 12 110 1.9 13 3.5 25.6 3.5 27.8 0 9.1-5.2 14-19 18.3-12.6 3.9-18.8 2.6-22.6-4.8-2.4-4.7-12.4-73.6-15.3-105.8a1149 1149 0 0 1-3.7-61.8c-.6-17.3-1-19.6-2.7-21.9-2-2.5-2.3-2.5-10.1-2-4.5.3-18 2.4-30.1 4.7-30.9 5.8-35.4 5.6-40.2-1.7-2.2-3.3-2.4-14-.4-19.6 1.4-4 6.1-10.1 9.1-11.7 1-.5 15.4-3.2 32-6a1591 1591 0 0 0 90.5-16.6c14.5-3.8 29.6-7.1 40.5-8.7 4.8-.8 8.8-1.2 12.2-1.5ZM140.6 148c8.7-.1 14.3 3.1 27 15.2s26.2 28.8 56.3 69.5c26.1 35.4 24.8 34.2 41 34.2 19.7 0 24.2 6.2 18.2 25-3.3 10.4-3.7 13.4-2.1 17.6.6 1.5 6.5 10 13 19 6.6 8.9 12.7 17.5 13.5 19 4.7 9 2 15.5-9.3 23.6a78 78 0 0 1-11 6.8c-4 1.6-10.2.8-13.7-1.6-1.4-1-8-9.3-14.5-18.4-24.1-33.1-35.4-47.4-39-49.3-3.1-1.6-5.1-1.7-16.5-1.2-41.4 1.9-95.8 6.5-99.3 8.4-3.8 2-5.2 5.5-11.2 27.2a171.3 171.3 0 0 1-7.7 23.8c-1 1.4-3.9 3.6-6.4 5-3.9 2-5.3 2.2-12.3 1.6-14.3-1.1-20-5.6-20-15.5 0-2.5 1.6-9.7 3.3-16 1.7-6.5 3.1-12.6 3.1-13.8 0-3.3-3.5-6.2-7.3-6.2-5.7 0-7.1-2.7-7.6-13.7-.4-11 1-17.1 4.8-20.7A22 22 0 0 1 56 282c4.4 0 9.6-2.4 11.6-5.5.9-1.4 4.7-12.6 8.4-24.8 18.5-61 22-71.5 28.6-82.3a40.7 40.7 0 0 1 36-21.3Zm-1.8 56c-4 .2-6.7 7.5-14.8 32.4-9.8 30.3-10.3 33-5.4 36.2 2.3 1.5 3.7 1.5 18.7 0 9-1 21.4-2 27.7-2.3 6.3-.3 13.2-1 15.3-1.5 4.4-1 7.1-4.6 6.2-8-1.2-4.9-38.1-51.9-43-54.9-1.9-1.2-3.4-1.9-4.7-1.8Z"
            />
        </svg>
    );
};

export default Authentication;
