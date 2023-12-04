import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, yupResolver } from '@mantine/form'

import { PromocodeItemTypeForm } from '../components/Promocode/PromocodeForm'
import { FORM } from '../const/form'
import { STATUS } from '../const/statuses'
import { AppStatus } from '../redux/appReducer'
import {
  PromocodeErrorType,
  addPromocode,
  editPromocode,
  setPromocodeStatus,
} from '../redux/promocodesReducer'
import { AppDispatchType, RootStateType } from '../redux/store'
import { getPromocodeErrors, getStatusPromocode } from '../selectors/selectors'
import { dateFormatDelimeter } from '../utils/utils'

export const usePromocodeForm = ({ initValues, onClose }: PromocodeItemTypeForm) => {
  const init = initValues ? { ...initValues, date: new Date(initValues.date) } : initValues
  const error = useSelector<RootStateType, PromocodeErrorType | null>(getPromocodeErrors)
  const status = useSelector<RootStateType, AppStatus>(getStatusPromocode)
  const dispatch = useDispatch()
  const form = useForm({
    initialValues: init || FORM.INIT.PROMOCODES,
    validate: yupResolver(FORM.VALIDATION.PROMOCODES),
    validateInputOnBlur: true,
  })
  const buttonDisable = !form.isValid()
  const buttonName = init ? 'Изменить' : 'Добавить'
  const currentDate = new Date()
  const executePromocode = init ? editPromocode : addPromocode

  const formHandler = form.onSubmit(fields => {
    const promocode = {
      ...fields,
      date: dateFormatDelimeter(new Date(fields.date).toISOString()),
      id: init?.id || 0,
    }

    dispatch<AppDispatchType>(executePromocode(promocode))
  })

  useEffect(() => {
    if (error && status === STATUS.ERROR) {
      form.setErrors(error)
    }
    if (status === STATUS.SUCCESS) {
      onClose()
      dispatch(setPromocodeStatus(STATUS.IDLE))
    }
  }, [status])

  return {
    buttonDisable,
    buttonName,
    currentDate,
    form,
    formHandler,
  }
}
