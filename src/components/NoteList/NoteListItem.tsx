import { ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, forwardRef, memo, useMemo } from 'react';
import { Link, LinkProps as RouterLinkProps } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        listStyle: 'none',
    },
});

type NoteProps = {
    id: string;
    title: string;
};

const NoteListItem: FC<NoteProps> = ({ id, title }) => {
    const classes = useStyles();

    const CustomLink = useMemo(
        () =>
            // eslint-disable-next-line react/display-name
            forwardRef<never, Omit<RouterLinkProps, 'to'>>((linkProps, ref) => (
                <Link to={`/${id}`} {...linkProps} ref={ref} />
            )),
        [id],
    );

    return (
        <div className={classes.root}>
            <ListItem button={true} component={CustomLink}>
                <ListItemText primary={title} />
            </ListItem>
        </div>
    );
};

export default memo(NoteListItem);
