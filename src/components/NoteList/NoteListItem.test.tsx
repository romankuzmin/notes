import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router';

import NoteListItem from './NoteListItem';

test('Render default item', () => {
    const title = 'Note test';
    const history = createMemoryHistory();
    const { asFragment, getByRole } = render(
        <Router history={history}>
            <NoteListItem id="1" title={title} />
        </Router>,
    );

    expect(getByRole('button')).toHaveAttribute('href', '/1');
    expect(asFragment()).toMatchSnapshot();
});
