const getMessages = async (locale?: string, namespaces: (keyof IntlMessages)[] = []) => {
    if (!locale) {
        return {};
    }

    const json = await import(`client/i18n/translations/${locale}.json`);
    const messages: IntlMessages = json.default;

    if (namespaces.length === 0) {
        return messages;
    }

    return namespaces.reduce((result, namespace) => {
        return Object.assign(result, { [namespace]: messages[namespace] });
    }, {});
};

export default getMessages;
