import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Language as LanguageIcon } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';
import React, { FC, memo, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { getLocales } from '../../i18n';
import { useSettings } from '../../redux/settings/useSettings';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 250,
        },
        item: {
            marginLeft: theme.spacing(2),
        },
    }),
);

const locales = getLocales();

const LocaleList: FC = () => {
    const { settings, setLocale } = useSettings();
    const classes = useStyles();

    const handleChangeLocale = useCallback(
        (locale: string) => () => {
            setLocale(locale);
        },
        [setLocale],
    );

    return (
        <List
            className={classes.root}
            subheader={
                <ListSubheader>
                    <FormattedMessage id="app.locales" />
                </ListSubheader>
            }
        >
            {locales.map((locale, index) => (
                <ListItem button key={locale.id} onClick={handleChangeLocale(locale.id)} className={classes.item}>
                    {locale.id === settings.locale ? (
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                    ) : null}
                    <ListItemText inset={locale.id !== settings.locale} primary={locale.title} />
                </ListItem>
            ))}
        </List>
    );
};

export default memo(LocaleList);
