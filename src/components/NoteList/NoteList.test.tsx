import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Note } from '../../redux/notes/types';

import NoteList from './NoteList';

function createMatchMedia(width: number) {
    return (query: string) =>
        (({
            matches: mediaQuery.match(query, { width }),
            addListener: () => {},
            removeListener: () => {},
        } as unknown) as MediaQueryList);
}

describe('NoteList', () => {
    beforeAll(() => {
        window.matchMedia = createMatchMedia(window.innerWidth);
    });

    test('Render blank list', () => {
        const { asFragment } = render(
            <IntlProvider locale="en" messages={{ 'notes.list.blank': "Notes are blank. It's time to create one ..." }}>
                <NoteList items={[]} />,
            </IntlProvider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('Render list with loading state', () => {
        const { asFragment } = render(
            <IntlProvider locale="en" messages={{}}>
                <NoteList items={[]} loading={true} />,
            </IntlProvider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('Render list with two items', () => {
        const items: Note[] = [
            {
                id: '1',
                title: 'Note no. 1',
            },
            {
                id: '2',
                title: 'Note no. 2',
            },
        ];

        const { asFragment } = render(
            <IntlProvider locale="en" messages={{}}>
                <NoteList items={items} loading={true} />,
            </IntlProvider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
