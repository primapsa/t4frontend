import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ConcertsFileType, ConcertsType} from "../../../api/api";
import {deleteConcert, fetchConcertsAdmin, setPage} from "../../../redux/concertsReducer";
import {AppDispatchType, RootStateType} from "../../../redux/store";
import Item from "../../../components/Item/Item";
import {Button, Flex, Modal} from '@mantine/core';
import ConcertsForm from "../../../components/AddForm/ConcertsForm";
import {PAGE} from "../../../const/page";
import ActionBar from "../../../components/ActionBar/ActionBar";
import Pagination from "../../../components/Pagination/Pagination";
import {LINKS} from "../../../const/routes";
import {AppStatus} from "../../../redux/appReducer";
import {useStyles} from "./styles";
import EmptyStateWithLoader from "../../../components/Empty/EmptyStateWithLoader";
import {Link} from "react-router-dom"
import {MEDIA} from "../../../const/media";
import {generateImageFromUrl} from "../../../utils/utils";
import {getConcerts, getPage, getStatus, getTotal} from "../../../selectors/selectors";

const Concerts = () => {

    const {classes} = useStyles()
    const [init, setInit] = useState<undefined | ConcertsFileType>(undefined)
    const [isModal, setIsModal] = useState(false)
    const concerts = useSelector<RootStateType, ConcertsType[]>(getConcerts)
    const total = useSelector<RootStateType, number>(getTotal)
    const page = useSelector<RootStateType, number>(getPage)
    const status = useSelector<RootStateType, AppStatus>(getStatus)

    const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)

    const dispatch = useDispatch()
    const modalHandler = useCallback(() => setIsModal(false),[])

    useEffect(() => {
        dispatch<AppDispatchType>(fetchConcertsAdmin())
    }, [page, total])

    const onCloseHandler = useCallback(() => setIsModal(false), [])

    const onClickHandler = useCallback(() => {
        setInit(undefined)
        setIsModal(true)
    }, [])

    const onChangeHandler = useCallback((page: number) => {
        dispatch<AppDispatchType>(setPage(page))
    },[page])

    const onDeleteHandler = useCallback((id: number) => {
        dispatch<AppDispatchType>(deleteConcert(id))
    },[concerts])

    const onEditHandler = useCallback(async (cId: number) => {
            if (concerts) {
                const edit = concerts.find(({id}) => id === cId)
                if (edit) {
                    const name = edit.poster
                    const file = await generateImageFromUrl(`${MEDIA.URL}${name}`, name)
                    setInit({...edit, poster: file})
                    setIsModal(true)
                }
            }
        }, [concerts])

    const list = concerts.map(e =>
        <Flex key={e.id} className={classes.item}>
            <Link to={`${LINKS.CONCERT}${e.id}`} className={classes.link}>
                <Item id={e.id}
                      title={e.title}
                      concertName={e.concertName}
                      composer={e.composer}
                      wayHint={e.wayHint}
                      headliner={e.headliner}
                      censor={e.censor}
                      date={e.date}
                      address={e.address}
                      type={e.type}
                      voice={e.voice}
                      price={e.price}
                      ticket={e.ticket}
                      poster={e.poster}
                />
            </Link>
            <ActionBar id={e.id} del={onDeleteHandler} edit={onEditHandler}/>
        </Flex>)

    return (
        <EmptyStateWithLoader isEmpty={!concerts.length} status={status}>
            <Flex className={classes.center}>
                <Flex className={classes.wrapper}>
                    <Button className={classes.button} onClick={onClickHandler}>Добавить концерт</Button>
                    <Modal classNames={{content: classes.content, inner: classes.inner}}
                           opened={isModal}
                           onClose={modalHandler}>
                        <ConcertsForm init={init} onClose={onCloseHandler}/>
                    </Modal>
                    <Flex className={classes.concerts}>
                        {list}
                    </Flex>
                    <Pagination total={pages} page={page} onChange={onChangeHandler}></Pagination>
                </Flex>
            </Flex>
        </EmptyStateWithLoader>
    );
};

export default React.memo(Concerts);

