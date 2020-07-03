import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@material-ui/lab';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

type AlertProps = {
    message: string;
} & MuiAlertProps;

const Alert: FC<Omit<AlertProps, 'children'>> = ({ message, ...rest }) => (
    <MuiAlert elevation={6} variant="filled" {...rest}>
        <FormattedMessage id={message} />
    </MuiAlert>
);

export default Alert;
