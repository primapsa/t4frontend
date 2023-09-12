import React from 'react';
import {Button, Center, Flex, Modal} from '@mantine/core';
import ActionBar from "../../../components/ActionBar/ActionBar";
import PromocodeForm from "../../../components/Promocode/PromocodeForm";
import Promocode from "../../../components/Promocode/Promocode";
import {useStyles} from "./styles";
import EmptyStateWithLoader from "../../../components/Empty/EmptyStateWithLoader";
import {usePromocodes} from "../../../hooks/usePromocodes";
import Pagination from "../../../components/Pagination/Pagination";
import {STATUS} from "../../../const/statuses";

const Promocodes = () => {

    const {classes} = useStyles()
    const {
        promocodes,
        deleteItemHandler,
        editItemHandler,
        status,
        onClickHandler,
        closeModal,
        isModal,
        itemEdit,
        onModalCloseHandler,
        page,
        pages,
        onChangePageHandler
    } = usePromocodes()

    const list = promocodes.map(p =>
        <Flex key={p.id} className={classes.promocode}>
            <Promocode date={p.date} title={p.title} discount={p.discount}/>
            <ActionBar id={p.id} del={deleteItemHandler} edit={editItemHandler}/>
        </Flex>
    )

    return (
            <Center>
                <Flex className={classes.wrapper}>
                    <Button className={classes.button}
                            onClick={onClickHandler}
                            disabled={status === STATUS.LOADING}>
                        Добавить промокод
                    </Button>
                    <Modal opened={isModal} onClose={closeModal}>
                        <PromocodeForm initValues={itemEdit} onClose={onModalCloseHandler}/>
                    </Modal>
                    <EmptyStateWithLoader isEmpty={!list.length} status={status}>
                        <Flex className={classes.promocodes}>
                            {list}
                        </Flex>
                        <Pagination total={pages} page={page} onChange={onChangePageHandler}></Pagination>
                    </EmptyStateWithLoader>
                </Flex>
            </Center>
    );
};


export default Promocodes;