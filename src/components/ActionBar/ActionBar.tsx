import React from 'react';
import { ActionIcon, Flex } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
const ActionBar = ({del, edit, id}: ActionBarPropsType) => {
    const onDeleteHandler = del ? () => del(id) : null
    const onEditHandler = edit ? () => edit(id) : null
    return (
        <Flex direction={'column'}>
            {onDeleteHandler && <ActionIcon variant="outline" title="delete" color={'red'} onClick={onDeleteHandler}><IconTrash/></ActionIcon>}
            {onEditHandler && <ActionIcon variant="outline" title="edit" color={'blue'} onClick={onEditHandler}><IconEdit/></ActionIcon>}
        </Flex>
    );
};

export default ActionBar;

type ActionBarPropsType = {
    del?: (id: number) => void
    edit?: (id: number) => void
    id: number
}