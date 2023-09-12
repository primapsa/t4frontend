import React from 'react';
import {Button, Flex, Modal} from '@mantine/core';
import ConcertsForm from "../../../components/AddForm/ConcertsForm";
import Pagination from "../../../components/Pagination/Pagination";
import {useStyles} from "./styles";
import EmptyStateWithLoader from "../../../components/Empty/EmptyStateWithLoader";
import {useConcerts} from "../../../hooks/useConcerts";
import {STATUS} from "../../../const/statuses";

const Concerts = () => {
    const {classes} = useStyles()
    const {
        onClickHandler,
        isModal,
        modalHandler,
        init,
        onCloseHandler,
        status,
        list,
        pages,
        page,
        onChangeHandler
    } = useConcerts()

    return (
        <Flex className={classes.center}>
            <Flex className={classes.wrapper}>
                <Button className={classes.button}
                        onClick={onClickHandler}
                        disabled={status === STATUS.LOADING}>
                    Добавить концерт</Button>
                <Modal classNames={{content: classes.content, inner: classes.inner}}
                       opened={isModal}
                       onClose={modalHandler}>
                    <ConcertsForm init={init} onClose={onCloseHandler}/>
                </Modal>
                <EmptyStateWithLoader isEmpty={!list.length} status={status}>
                    <Flex className={classes.concerts}>
                        {list}
                    </Flex>
                    <Pagination total={pages} page={page} onChange={onChangeHandler}></Pagination>
                </EmptyStateWithLoader>
            </Flex>
        </Flex>
    );
};

export default React.memo(Concerts);

