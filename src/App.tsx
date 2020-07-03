import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { TranslationProvider } from './i18n';
import { useSettings } from './redux/settings/useSettings';
import { HomeScreen, NoteDetailScreen } from './screens';

type AppProps = {
    history: History;
};

const App: FC<AppProps> = ({ history }) => {
    const { settings } = useSettings();
    return (
        <TranslationProvider locale={settings.locale}>
            <CssBaseline />
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route path="/create" component={NoteDetailScreen} />
                    <Route path="/:id" component={NoteDetailScreen} />
                    <Route render={() => <div>Miss</div>} />
                </Switch>
            </ConnectedRouter>
        </TranslationProvider>
    );
};

export default App;
