import { SvgProps } from 'assets/svg/utils';

type FlagRuProps = Omit<SvgProps, 'xmlnsXlink'>;

const FlagRu = (props: FlagRuProps) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 24"
        >
            <defs>
                <path id="f-ru-a" d="M0 0h32v24H0z" />
                <path id="f-ru-c" d="M0 0h32v24H0z" />
            </defs>
            <g fill="none" fillRule="evenodd">
                <mask id="f-ru-b" fill="#FFF">
                    <use xlinkHref="#f-ru-a" />
                </mask>
                <g mask="url(#f-ru-b)">
                    <mask id="f-ru-d" fill="#FFF">
                        <use xlinkHref="#f-ru-c" />
                    </mask>
                    <use xlinkHref="#f-ru-c" fill="#3D58DB" />
                    <path fill="#F7FCFF" d="M0 0h32v8H0z" mask="url(#f-ru-d)" />
                    <path fill="#C51918" d="M0 16h32v8H0z" mask="url(#f-ru-d)" />
                </g>
            </g>
        </svg>
    );
};

export default FlagRu;
