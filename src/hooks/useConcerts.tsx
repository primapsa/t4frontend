import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Flex } from '@mantine/core'

import { ConcertTypesType, ConcertsFileType, ConcertsType, SingerVoiceType } from '../api/api'
import ActionBar from '../components/ActionBar/ActionBar'
import Item from '../components/Item/Item'
import { MEDIA } from '../const/media'
import { PAGE } from '../const/page'
import { LINKS } from '../const/routes'
import { ITEM_STATUS, STATUS } from '../const/statuses'
import { useStyles } from '../features/Admin/Concerts/styles'
import { AppStatus } from '../redux/appReducer'
import {
  addStatus,
  clearConcertsErrors,
  deleteConcert,
  fetchConcertsAdmin,
  setPage,
} from '../redux/concertsReducer'
import { RootStateType, useAppDispatch } from '../redux/store'
import {
  getConcertType,
  getConcerts,
  getPage,
  getSingerVoice,
  getStatus,
  getStatusConcerts,
  getTotal,
} from '../selectors/selectors'
import { generateImageFromUrl, getConcertTitle, getSingerVOiceTitle } from '../utils/utils'

export const useConcerts = () => {
  const dispatch = useAppDispatch()
  const { classes } = useStyles()
  const [init, setInit] = useState<ConcertsFileType | undefined>(undefined)
  const [isModal, setIsModal] = useState(false)
  const concerts = useSelector<RootStateType, ConcertsType[]>(getConcerts)
  const total = useSelector<RootStateType, number>(getTotal)
  const page = useSelector<RootStateType, number>(getPage)
  const status = useSelector<RootStateType, AppStatus>(getStatusConcerts)
  const concertType = useSelector<RootStateType, ConcertTypesType[]>(getConcertType)
  const singerVoice = useSelector<RootStateType, SingerVoiceType[]>(getSingerVoice)

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

  const onChangeHandler = useCallback(
    (page: number) => {
      dispatch(setPage(page))
    },
    [page]
  )

  const onDeleteHandler = useCallback(
    (id: number) => {
      dispatch(deleteConcert(id))
    },
    [concerts]
  )

  const onEditHandler = useCallback(
    async (cId: number) => {
      if (concerts) {
        const edit = concerts.find(({ id }) => id === cId)

        if (edit) {
          dispatch(addStatus(STATUS.IDLE))
          const name = edit.poster
          const file = await generateImageFromUrl(`${MEDIA.URL}${name}`, name)

          setInit({ ...edit, poster: file })
          setIsModal(true)
        }
      }
    },
    [concerts]
  )

  const list = concerts.map(e => (
    <Flex className={classes.item} key={e.id}>
      <Link className={classes.link} to={`${LINKS.CONCERT}${e.id}`}>
        <Item
          address={e.place.address}
          censor={e.censor}
          composer={e.composer}
          concertName={e.concertName}
          date={e.date}
          headliner={e.headliner}
          id={e.id}
          poster={e.poster}
          price={e.price}
          ticket={e.ticket}
          ticket_limit={e.ticket_limit}
          title={e.title}
          type={getConcertTitle(+e.type, concertType)}
          voice={getSingerVOiceTitle(+e.singerVoice, singerVoice)}
          wayHint={e.wayHint}
        />
      </Link>
      <ActionBar
        del={onDeleteHandler}
        disabled={e.status === ITEM_STATUS.DELETE}
        edit={onEditHandler}
        id={e.id}
      />
    </Flex>
  ))

  return {
    init,
    isModal,
    list,
    modalHandler,
    onChangeHandler,
    onClickHandler,
    onCloseHandler,
    page,
    pages,
    status,
  }
}
