declare var umami: umami.umami;

declare namespace umami {
    interface umami {
        trackEvent(event_name: string, event_data?: Record<string, unknown>, url?: string, website_id?: string): void;
        trackView(url: string, referrer?: string, website_id?: string): void;
    }
}
