import { MessageFormatElement } from 'intl-messageformat-parser';
import React, { FC, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';

import messages_cs from './cs.json';
import messages_de from './de.json';
import messages_en from './en.json';

type LocaleMessages = {
    [key: string]: {
        title: string;
        messages: Record<string, string> | Record<string, MessageFormatElement[]>;
    };
};

const localeMessages = {
    cs: {
        title: 'Čeština',
        messages: messages_cs,
    },
    de: {
        title: 'Deutsch',
        messages: messages_de,
    },
    en: {
        title: 'English',
        messages: messages_en,
    },
} as LocaleMessages;

type TranslationProviderProps = {
    locale: string;
};

export const TranslationProvider: FC<PropsWithChildren<TranslationProviderProps>> = ({ locale, children }) => {
    return (
        <IntlProvider locale={locale} messages={localeMessages[locale].messages}>
            {children}
        </IntlProvider>
    );
};

export const getLocales = () =>
    Object.keys(localeMessages).map((locale) => ({
        id: locale,
        title: localeMessages[locale].title,
    }));
