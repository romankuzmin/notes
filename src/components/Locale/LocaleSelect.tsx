import { MenuItem, Select, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import React, { FC, memo, useCallback } from 'react';
import { getLocales } from '../../i18n';
import { useSettings } from '../../redux/settings/useSettings';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: 0,
            color: '#fff',
            '&> svg': {
                color: '#fff',
            },
            '&> fieldset': {
                border: 0,
            },
        },
    }),
);

const locales = getLocales();

const LocaleSelect: FC = () => {
    const { settings, setLocale } = useSettings();
    const classes = useStyles();

    const handleChangeLocale = useCallback(
        (event: React.ChangeEvent<{ value: unknown }>) => {
            setLocale(event.target.value as string);
        },
        [setLocale],
    );

    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={settings.locale}
            className={classes.root}
            variant="outlined"
            onChange={handleChangeLocale}
        >
            {locales.map((locale) => (
                <MenuItem key={locale.id} value={locale.id}>
                    {locale.title}
                </MenuItem>
            ))}
        </Select>
    );
};

export default memo(LocaleSelect);
