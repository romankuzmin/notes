import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Fab,
    Hidden,
    Snackbar,
    Theme,
    useMediaQuery,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Edit as EditIcon } from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { createStyles } from '@material-ui/styles';
import { History } from 'history';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { match } from 'react-router-dom';
import Alert from '../components/Alert';
import Header from '../components/Header';
import { LocaleSelect } from '../components/Locale';
import NoteForm from '../components/NoteForm';
import { useNote } from '../redux/notes/useNotes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            fontSize: '1.5rem',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        grow: {
            flexGrow: 1,
        },
        progress: {
            display: 'flex',
            marginTop: theme.spacing(2),
            alignItems: 'center',
            justifyContent: 'center',
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        snackbarError: {
            '&> div': {
                padding: 0,
                backgroundColor: 'transparent',
                '&> div': {
                    padding: 0,
                },
            },
        },
    }),
);

type Mode = 'default' | 'create' | 'edit' | 'save' | 'delete';

const returnToHome = (history: History) => history.replace('/');

type ModeHandlerProps = {
    mode: Mode;
    onClick: (mode: Mode) => void;
    children: (handler: () => void) => React.ReactElement;
};

const ModeHandler: FC<ModeHandlerProps> = ({ mode, onClick, children }) => {
    const handleClick = useCallback(() => {
        onClick(mode);
    }, [onClick, mode]);

    return children(handleClick);
};

type DetailScreenProps = {
    history: History;
    match: match<{ id: string }>;
};

const NoteDetailScreen: FC<DetailScreenProps> = ({ history, match }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [noteTitle, setNoteTitle] = useState();
    const intl = useIntl();
    const { id } = match.params;
    const { note, message, state, createNote, updateNote, deleteNote, notifyMessage } = useNote(id);
    const [noteValid, setNoteValid] = useState(false);
    const [mode, setMode] = useState<Mode>('default');
    const isDefaultMode = mode === 'default';
    const isCreateMode = id === undefined;
    const isEditMode = mode === 'edit';
    const openSnackbar = mode === 'create' || mode === 'save' || mode === 'delete';
    const hasError = state === 'rejected';
    const title = note ? note.title : '';

    useEffect(() => {
        if (state === 'fulfilled') {
            if (mode === 'save') {
                setMode('default');
                if (isDesktop) {
                    returnToHome(history);
                }
            } else if (mode === 'create' || mode === 'delete') {
                returnToHome(history);
            }
        }
    }, [state, mode, history, isDesktop]);

    useEffect(() => {
        if (isDesktop || id === undefined) {
            setMode('edit');
        }
    }, [isDesktop, id]);

    const handleChangeValue = useCallback((value: string) => {
        setNoteTitle(value);
    }, []);

    const handleValidate = useCallback((valid: boolean) => {
        setNoteValid(valid);
    }, []);

    const handleAction = useCallback(() => {
        if (mode === 'default' && id) {
            returnToHome(history);
        } else if (mode === 'edit') {
            if (id) {
                if (noteTitle) {
                }
                setMode('save');
                notifyMessage('notes.detail.updating');
            } else {
                setMode('create');
                notifyMessage('notes.detail.creating');
            }
        }
    }, [mode, history, id, notifyMessage, noteTitle]);

    const handleProcess = useCallback(() => {
        if (mode === 'create' && !hasError) {
            createNote({
                id: id,
                title: noteTitle,
            });
        } else if (note && !hasError) {
            if (mode === 'save') {
                updateNote({
                    id: note.id,
                    title: noteTitle ? noteTitle : note.title,
                });
            } else if (mode === 'delete') {
                deleteNote(note);
            }
        } else if (hasError) {
            setMode('default');
        }
    }, [note, mode, id, noteTitle, createNote, updateNote, deleteNote, hasError]);

    const handleMode = useCallback(
        (mode: Mode) => {
            if (mode === 'delete') {
                notifyMessage('notes.detail.deleting');
            }

            if (mode === 'default' && isDesktop) {
                setMode('edit');
            } else {
                setMode(mode);
            }
        },
        [isDesktop, notifyMessage],
    );

    let appTitle = intl.formatMessage({ id: 'notes.title' });
    if (id && note) {
        appTitle = `${appTitle} - ${note.title}`;
    } else if (id === undefined) {
        appTitle = `${appTitle} - ${intl.formatMessage({ id: 'notes.add' })}`;
    }

    const snackbarMessage = message ? message : '';

    return (
        <>
            <Helmet>
                <title>{appTitle}</title>
            </Helmet>
            <Header>
                {(isDefaultMode || isEditMode || hasError) && (
                    <Hidden smUp>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            onClick={handleAction}
                            disabled={!noteValid}
                        >
                            {isEditMode ? <DoneIcon /> : <ArrowBackIcon />}
                        </IconButton>
                        <div className={classes.grow} />
                        {!isEditMode && !isCreateMode && (
                            <ModeHandler mode="delete" onClick={handleMode}>
                                {(handler) => (
                                    <IconButton edge="end" onClick={handler} color="inherit">
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </ModeHandler>
                        )}
                    </Hidden>
                )}

                <Hidden xsDown>
                    <Typography variant="h1" className={classes.title}>
                        {appTitle}
                    </Typography>
                    <LocaleSelect />
                </Hidden>
            </Header>
            <Container maxWidth="md" className={classes.container}>
                {state === 'fetching' && (
                    <div className={classes.progress}>
                        <CircularProgress />
                    </div>
                )}
                {state !== 'fetching' && (
                    <>
                        <Hidden smUp>
                            <NoteForm
                                value={title}
                                onChange={handleChangeValue}
                                disabled={!isEditMode}
                                onValidate={handleValidate}
                            />
                        </Hidden>
                        <Hidden xsDown>
                            <Card>
                                <CardContent>
                                    <NoteForm
                                        value={title}
                                        onChange={handleChangeValue}
                                        disabled={!isEditMode}
                                        onValidate={handleValidate}
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={handleAction}
                                        disabled={!isEditMode || !noteValid}
                                    >
                                        <FormattedMessage id={id ? 'notes.detail.save' : 'notes.detail.create'} />
                                    </Button>
                                    {!isCreateMode && (
                                        <ModeHandler mode="delete" onClick={handleMode}>
                                            {(handler) => (
                                                <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    onClick={handler}
                                                    disabled={!isEditMode}
                                                >
                                                    <FormattedMessage id="notes.detail.delete" />
                                                </Button>
                                            )}
                                        </ModeHandler>
                                    )}
                                </CardActions>
                            </Card>
                        </Hidden>
                        {isDefaultMode && (
                            <Hidden smUp>
                                <ModeHandler mode="edit" onClick={handleMode}>
                                    {(handler) => (
                                        <Fab className={classes.fab} color="inherit" onClick={handler}>
                                            <EditIcon />
                                        </Fab>
                                    )}
                                </ModeHandler>
                            </Hidden>
                        )}

                        <Snackbar
                            className={hasError ? classes.snackbarError : undefined}
                            open={openSnackbar && snackbarMessage !== ''}
                            autoHideDuration={1500}
                            message={
                                hasError ? (
                                    <Alert severity="error" message={snackbarMessage} />
                                ) : (
                                    <FormattedMessage id={snackbarMessage} />
                                )
                            }
                            action={
                                hasError ? null : (
                                    <ModeHandler mode="edit" onClick={handleMode}>
                                        {(handler) => (
                                            <Button color="inherit" size="small" onClick={handler}>
                                                <FormattedMessage id="notes.detail.undo" />
                                            </Button>
                                        )}
                                    </ModeHandler>
                                )
                            }
                            onClose={handleProcess}
                        />
                    </>
                )}
            </Container>
        </>
    );
};

export default NoteDetailScreen;
