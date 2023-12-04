import { PayPalResponseTYpe, paypalAPI } from '../api/api'
import { HTTP_STATUSES } from '../const/htttpStatus'
import { MESSAGE } from '../const/messages'

export const createPayOrder = (ids: number[]) => async (data: any, actions: any) => {
  try {
    const response = await paypalAPI.createOrder(ids)

    if (response.status === HTTP_STATUSES.OK) {
      return actions.order.create(response.data)
    }

    return MESSAGE.UNCAUGHT
  } catch (error) {
    return (error as Error).message
  }
}

export const makePayPalMessage = (data: any) => {
  return {
    message: `Заказ ${(data as PayPalResponseTYpe).orderID}\r\n${MESSAGE.SUCCESS_PAYMENT.message}`,
    title: MESSAGE.SUCCESS_PAYMENT.title,
  }
}
