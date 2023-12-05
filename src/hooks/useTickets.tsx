import React, { useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ConcertsType } from '../api/api'
import Ticket from '../components/Ticket/Ticket'
import { PAGE } from '../const/page'
import { LINKS } from '../const/routes'
import { STATUS } from '../const/statuses'
import { useStyles } from '../features/User/Tickets/styles'
import { AppStatus } from '../redux/appReducer'
import { addCart } from '../redux/cartReducer'
import { fetchConcertsAdmin, setPage } from '../redux/concertsReducer'
import { RootStateType, useAppDispatch } from '../redux/store'
import {
  getConcerts,
  getFilterQuery,
  getFilterType,
  getPage,
  getStatus,
  getStatusConcerts,
  getTotal,
  getUserId,
} from '../selectors/selectors'
import { makePayload } from '../utils/utils'

export const useTickets = () => {
  const dispatch = useAppDispatch()
  const concerts = useSelector<RootStateType, ConcertsType[]>(getConcerts)
  const total = useSelector<RootStateType, number>(getTotal)
  const page = useSelector<RootStateType, number>(getPage)
  const query = useSelector<RootStateType, string>(getFilterQuery)
  const type = useSelector<RootStateType, number>(getFilterType)
  const status = useSelector<RootStateType, AppStatus>(getStatusConcerts)
  const appStatus = useSelector<RootStateType, AppStatus>(getStatus)
  const userId = useSelector<RootStateType, null | number>(getUserId)
  const { classes } = useStyles()
  const pages = Math.ceil(total / PAGE.ITEM_PER_PAGE)

  useEffect(() => {
    dispatch(fetchConcertsAdmin())
  }, [page, query, type])

  const onChangeHandler = useCallback(
    (page: number) => {
      dispatch(setPage(page))
    },
    [page]
  )

  const addToCartHandler = (cId: number) => {
    const concert = concerts.find(c => c.id == cId)

    if (concert && userId) {
      const payload = makePayload(cId, concert.price, userId)

      dispatch(addCart(payload))
    }
  }

  const isLoaded = status === STATUS.LOADING && appStatus === STATUS.IDLE

  const list = concerts.map(concert => (
    <Link className={classes.link} key={concert.id} to={`../${LINKS.CONCERT}${concert.id}`}>
      <Ticket
        address={concert.place.address}
        date={concert.date}
        id={concert.id}
        isSold={!concert.ticket_limit}
        onAddToCart={addToCartHandler}
        price={concert.price}
        source={concert.poster}
        status={concert.status}
        title={concert.title}
      ></Ticket>
    </Link>
  ))

  const coordinates = useMemo(
    () =>
      concerts.map(c => ({
        lat: parseFloat(c.place.latitude),
        lng: parseFloat(c.place.longitude),
        title: c.title,
      })),
    [concerts]
  )

  return { appStatus, coordinates, isLoaded, list, onChangeHandler, page, pages, status }
}
