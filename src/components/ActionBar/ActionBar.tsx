import React from 'react';
import {ActionIcon, Flex} from '@mantine/core';
import {IconEdit, IconTrash} from '@tabler/icons-react';
import {useStyles} from "./styles";

const ActionBar = ({del, edit, id, disabled = false}: ActionBarPropsType) => {

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
                            disabled={disabled}
                            onClick={onDeleteHandler}>
                    <IconTrash/>
                </ActionIcon>}
            {onEditHandler &&
                <ActionIcon className={classes.icon}
                            variant="outline"
                            title="edit"
                            color={'blue'}
                            disabled={disabled}
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
    disabled?: boolean
    id: number
}
