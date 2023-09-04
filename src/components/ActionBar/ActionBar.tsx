import React from 'react';
import {ActionIcon, Flex} from '@mantine/core';
import {IconTrash, IconEdit} from '@tabler/icons-react';
import {useStyles} from "./styles";

const ActionBar = ({del, edit, id}: ActionBarPropsType) => {

    const {classes} = useStyles()
    const onDeleteHandler = del ? () => del(id) : null
    const onEditHandler = edit ? () => edit(id) : null

    return (
        <Flex className={classes.bar}>
            {onDeleteHandler &&
                <ActionIcon className={classes.icon}
                            variant="outline"
                            title="delete"
                            color={'red'}
                            onClick={onDeleteHandler}>
                    <IconTrash/>
                </ActionIcon>}
            {onEditHandler &&
                <ActionIcon className={classes.icon}
                            variant="outline"
                            title="edit"
                            color={'blue'}
                            onClick={onEditHandler}>
                    <IconEdit/>
                </ActionIcon>}
        </Flex>
    );
};

export default React.memo(ActionBar);

type ActionBarPropsType = {
    del?: (id: number) => void
    edit?: (id: number) => void
    id: number
}
