import React from 'react';
import { ActionIcon, Flex } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
const ActionBar = ({deleteItem, editItem, id}: ActionBarPropsType) => {
    const onDeleteHandler = () => deleteItem(id)
    const onEditHandler = () => editItem(id)
    return (
        <Flex direction={'column'}>
           <ActionIcon variant="outline" title="delete" color={'red'} onClick={onDeleteHandler}><IconTrash/></ActionIcon>
           <ActionIcon variant="outline" title="edit" color={'blue'} onClick={onEditHandler}><IconEdit/></ActionIcon>
        </Flex>
    );
};

export default ActionBar;

type ActionBarPropsType = {
    deleteItem: (id: number) => void
    editItem: (id: number) => void
    id: number
}