type OpenGraphTypeGlobal = 'article' | 'book' | 'profile' | 'website';
type OpenGraphTypeMusic = 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station';
type OpenGraphTypeVideo = 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';

type OpenGraphType = OpenGraphTypeGlobal | OpenGraphTypeMusic | OpenGraphTypeVideo;

export type OpenGraph = {
    type?: OpenGraphType;
    title?: string;
    description?: string;
};
