import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, yupResolver } from '@mantine/form'

import { ConcertTypesType, SingerVoiceType } from '../api/api'
import { PlaceCoordinatesType } from '../components/Address/AddressAutocomplete'
import { FORM } from '../const/form'
import { STATUS } from '../const/statuses'
import { AppStatus } from '../redux/appReducer'
import { ConcertErrorsType, addNewConcert, updateConcert } from '../redux/concertsReducer'
import { AppDispatchType, RootStateType } from '../redux/store'
import {
  getConcertErrors,
  getConcertType,
  getSingerVoice,
  getStatusConcerts,
} from '../selectors/selectors'
import { concertInitAdapter } from '../utils/concertInitAdapter'
import { formatConcertRequest, formatConcertUpdateRequest } from '../utils/concertRequestFromat'
import { getCommonErrors } from '../utils/utils'

export const useConcertForm = ({ init, onClose }: InitialValuesType) => {
  const initial = init ? concertInitAdapter(init) : init
  const [concertType, setConcertType] = useState<Number>(Number(initial?.type || ''))
  const concertsType = useSelector<RootStateType, ConcertTypesType[]>(getConcertType)
  const singerVoice = useSelector<RootStateType, SingerVoiceType[]>(getSingerVoice)
  const errors = useSelector<RootStateType, ConcertErrorsType | null>(getConcertErrors)
  const status = useSelector<RootStateType, AppStatus>(getStatusConcerts)

  const currentDate = new Date()
  const dispatch = useDispatch()

  const form = useForm({
    initialValues: initial || FORM.INIT.CONCERTS,
    validate: yupResolver(FORM.VALIDATION.CONCERTS),
  })

  const onChangeHandler = useCallback(async (value: string) => {
    form.setFieldValue('type', value)
    setConcertType(Number(value))
    form.setValues(FORM.RESET)
  }, [])

  const onSetCoordinates = useCallback(
    (coordinates: PlaceCoordinatesType, place: string) => {
      form.setFieldValue('latitude', coordinates.lat)
      form.setFieldValue('longitude', coordinates.lng)
      form.setFieldValue('address', place)
    },
    [dispatch]
  )

  useEffect(() => {
    if (status === STATUS.ERROR && errors) {
      form.setErrors(getCommonErrors(errors))
    }
    if (status === STATUS.SUCCESS) {
      onClose()
    }
  }, [status])

  const formHandler = form.onSubmit(fields => {
    const formatted = formatConcertRequest(fields)

    init
      ? // dispatch<AppDispatchType>(updateConcert({id: initial.id, concert: formatConcertUpdateRequest(fields)})) :
        dispatch<AppDispatchType>(
          updateConcert({ concert: formatConcertRequest(fields), id: initial.id })
        )
      : dispatch<AppDispatchType>(addNewConcert(formatted))
  })

  return {
    concertType,
    concertsType,
    currentDate,
    form,
    formHandler,
    onChangeHandler,
    onSetCoordinates,
    singerVoice,
    status,
  }
}

export type InitialValuesType = {
  init: any | undefined
  onClose: () => void
}
