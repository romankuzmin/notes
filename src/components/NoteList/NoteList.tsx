import { Hidden, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import NoteListItem from './NoteListItem';

const useStyles = makeStyles({
    root: {
        // maxWidth: '800px',
        // margin: 'auto 0',
    },
});

type NoteProps = {
    id: string;
    title: string;
};

type NoteListProps = {
    items: NoteProps[];
    loading?: boolean;
};

const generateLoadingList = (length = 10) => {
    return new Array(length).fill('').map((item, index) => ({ id: `${index + 1}`, title: '' } as NoteProps));
};

const NoteList: FC<NoteListProps> = ({ items = [], loading = false }) => {
    const classes = useStyles();
    const list = loading ? generateLoadingList() : items;

    const noteItems = (
        <List component="nav">
            {list.map((item) =>
                loading ? (
                    <ListItem key={item.id}>
                        <ListItemText primary={<Skeleton animation="wave" variant="text" height={15} />} />
                    </ListItem>
                ) : (
                    <NoteListItem key={item.id} {...item} />
                ),
            )}
            {list.length === 0 && !loading && <ListItemText primary={<FormattedMessage id={'notes.empty'} />} />}
        </List>
    );

    return (
        <div className={classes.root}>
            <Hidden xsDown>
                <Paper>{noteItems}</Paper>
            </Hidden>
            <Hidden smUp>{noteItems}</Hidden>
        </div>
    );
};

export default memo(NoteList);
