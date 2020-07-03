import { FormControl, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
    }),
);

type NoteFormProps = {
    value: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    onValidate?: (valid: boolean) => void;
};

const validateValue = (value: string) => {
    return value !== '' && value.length >= 3;
};

const NoteForm: FC<NoteFormProps> = ({ value, disabled = false, onChange = () => {}, onValidate = () => {} }) => {
    const classes = useStyles();
    const [textValue, setValue] = useState(value);
    const handleChangeValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const textValue = event.target.value;
            setValue(textValue);
            onChange(textValue);
            onValidate(validateValue(textValue));
        },
        [onChange, onValidate, setValue],
    );

    useEffect(() => {
        setValue(value);
        onValidate(validateValue(value));
    }, [value, onValidate]);

    const isValid = validateValue(textValue);

    return (
        <FormControl className={classes.root}>
            <TextField
                error={!isValid}
                label={<FormattedMessage id="notes.detail.form.title" />}
                value={textValue}
                onChange={handleChangeValue}
                disabled={disabled}
                helperText={isValid ? null : <FormattedMessage id="notes.detail.form.title.validation" />}
            />
        </FormControl>
    );
};

export default memo(NoteForm);
