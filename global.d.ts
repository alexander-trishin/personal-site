type Messages = typeof import('./src/i18n/translations/en-us.json');

declare interface IntlMessage extends Messages {}
