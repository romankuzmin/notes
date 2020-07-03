import { Button, Container, Drawer, Fab, Hidden, Snackbar, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Add as AddIcon } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles } from '@material-ui/styles';
import { History } from 'history';
import React, { FC, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import Alert from '../components/Alert';
import Header from '../components/Header';
import { LocaleSelect } from '../components/Locale';
import LocaleList from '../components/Locale/LocaleList';
import { NoteList } from '../components/NoteList';
import { useNotes } from '../redux/notes/useNotes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
        list: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
        },
        title: {
            flexGrow: 1,
            fontSize: '1.5rem',
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        fabDesktop: {
            marginBottom: theme.spacing(3),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        drawer: {
            width: 250,
        },
        listItem: {
            marginLeft: theme.spacing(2),
        },
    }),
);

type HomeScreenProps = {
    history: History;
};

const HomeScreen: FC<HomeScreenProps> = ({ history }) => {
    const classes = useStyles();
    const intl = useIntl();
    const { notes, state, message, refresh } = useNotes();
    const [open, setOpen] = useState(false);

    const handleCreateNote = useCallback(() => {
        history.replace('/create');
    }, [history]);

    const handleMenu = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleRefresh = useCallback(() => {
        refresh();
    }, [refresh]);

    const title = intl.formatMessage({ id: 'notes.title' });

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header>
                <Hidden smUp>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Typography variant="h1" className={classes.title}>
                    {title}
                </Typography>
                <Hidden xsDown>
                    <LocaleSelect />
                </Hidden>
            </Header>
            <Container maxWidth="md" className={classes.container}>
                <Hidden xsDown>
                    <Fab
                        variant="extended"
                        aria-label="Add"
                        className={classes.fabDesktop}
                        color="secondary"
                        onClick={handleCreateNote}
                    >
                        <AddIcon />
                        <FormattedMessage id="notes.add" />
                    </Fab>
                </Hidden>
                {state === 'rejected' && message ? (
                    <Alert
                        severity="error"
                        message={message}
                        action={
                            <Button color="inherit" size="small" onClick={handleRefresh}>
                                <FormattedMessage id="notes.refresh" />
                            </Button>
                        }
                    />
                ) : (
                    <NoteList items={notes} loading={state === 'fetching'} />
                )}
                <Hidden smUp>
                    <Fab aria-label="Add" className={classes.fab} color="secondary" onClick={handleCreateNote}>
                        <AddIcon />
                    </Fab>
                </Hidden>
            </Container>
            <Drawer anchor="left" open={open} onClose={handleMenu}>
                <LocaleList />
            </Drawer>
        </>
    );
};

export default HomeScreen;
