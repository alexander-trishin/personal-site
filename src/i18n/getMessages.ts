const getMessages = async (locale?: string, namespaces: (keyof IntlMessage)[] = []) => {
    if (!locale) {
        return {};
    }

    const json = await import(`i18n/translations/${locale}.json`);
    const messages: IntlMessage = json.default;

    if (namespaces.length === 0) {
        return messages;
    }

    return namespaces.reduce((result, namespace) => {
        return Object.assign(result, { [namespace]: messages[namespace] });
    }, {});
};

export default getMessages;
