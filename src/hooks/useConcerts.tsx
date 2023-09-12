import {RootStateType, useAppDispatch} from "../redux/store";
import React, {useCallback, useEffect, useState} from "react";
import {ConcertsFileType, ConcertsType} from "../api/api";
import {useSelector} from "react-redux";
import {getConcerts, getPage, getStatus, getTotal} from "../selectors/selectors";
import {AppStatus} from "../redux/appReducer";
import {PAGE} from "../const/page";
import {clearConcertsErrors, deleteConcert, fetchConcertsAdmin, setPage} from "../redux/concertsReducer";
import {generateImageFromUrl} from "../utils/utils";
import {MEDIA} from "../const/media";
import {Flex} from "@mantine/core";
import {Link} from "react-router-dom";
import {LINKS} from "../const/routes";
import Item from "../components/Item/Item";
import ActionBar from "../components/ActionBar/ActionBar";
import {useStyles} from "../features/Admin/Concerts/styles";
import {STATUS} from "../const/statuses";
import {addStatus} from "../redux/concertsReducer";

export const useConcerts = () => {

    const dispatch = useAppDispatch()
    const {classes} = useStyles()
    const [init, setInit] = useState<undefined | ConcertsFileType>(undefined)
    const [isModal, setIsModal] = useState(false)
    const concerts = useSelector<RootStateType, ConcertsType[]>(getConcerts)
    const total = useSelector<RootStateType, number>(getTotal)
    const page = useSelector<RootStateType, number>(getPage)
    const status = useSelector<RootStateType, AppStatus>(getStatus)

    const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)

    const modalHandler = useCallback(() => setIsModal(false), [])

    useEffect(() => {
        dispatch(fetchConcertsAdmin())
    }, [page])

    const onCloseHandler = useCallback(() => {
        setIsModal(false)
        dispatch(clearConcertsErrors())
    }, [])

    const onClickHandler = useCallback(() => {
        dispatch(addStatus(STATUS.IDLE))
        setInit(undefined)
        setIsModal(true)
    }, [])

    const onChangeHandler = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [page])

    const onDeleteHandler = useCallback((id: number) => {
        dispatch(deleteConcert(id))
    }, [concerts])

    const onEditHandler = useCallback(async (cId: number) => {
        if (concerts) {
            const edit = concerts.find(({id}) => id === cId)
            if (edit) {
                dispatch(addStatus(STATUS.IDLE))
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

    return {
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

    }
}