import * as yup from 'yup'

import { PROMOCODES, TICKETS } from './settings'

const concertsValidation = yup.object().shape({
  address: yup.string().min(1, 'Минимум 1 символ').max(100, 'Максимум 100 символов'),
  censor: yup.string().when('type', (type: any, schema) => {
    return String(type) === '2' ? schema.required('Введите значение') : schema
  }),
  composer: yup.string().when('type', (type: any, schema) => {
    return String(type) === '1' ? schema.required('Введите значение') : schema
  }),
  concertName: yup.string().when('type', (type: any, schema) => {
    return String(type) === '1' ? schema.required('Введите значение') : schema
  }),
  date: yup.date().required('Выберите дату и время'),
  desc: yup.string().min(1, 'Минимум 1 символ').max(15000, 'Максимум 15000 символов'),
  headliner: yup.string().when('type', (type: any, schema) => {
    return String(type) === '3' ? schema.required('Обязательное поле') : schema.notRequired()
  }),
  latitude: yup.string().matches(/\d+\.\d{5,}/, 'Введите корректную долготу, например: 41.40338'),
  longitude: yup.string().matches(/\d+\.\d{5,}/, 'Введите корректную широту, например: 2.17403'),
  poster: yup
    .mixed()
    .test('isEmpty', 'Выберите файл', (value: any) => !!value.name)
    .required('Выберите постер'),
  price: yup
    .number()
    .min(TICKETS.PRICE.MIN, 'Недопустимое значение')
    .max(TICKETS.PRICE.MAX, 'Превышено макс. значение '),
  singerVoice: yup.string().when('type', (type: any, schema) => {
    return String(type) === '1' ? schema.required('Выберите значение') : schema
  }),
  ticket: yup
    .number()
    .min(TICKETS.COUNT.MIN, 'Недопустимое значение')
    .max(TICKETS.COUNT.MAX, 'Превышено макс. значение '),
  title: yup.string().min(1, 'Минимум 1 символ').max(100, 'Максимум 100 символов'),
  type: yup.string().required('Выберите тип'),
  wayHint: yup.string().when('type', (type: any, schema) => {
    return String(type) === '3' ? schema.required('Обязательное поле') : schema.notRequired()
  }),
})
const promocodesValidation = yup.object().shape({
  date: yup.date().required('Выберите дату и время'),
  discount: yup
    .number()
    .min(PROMOCODES.DISCOUNT.MIN, 'Недопустимое значение')
    .max(PROMOCODES.DISCOUNT.MAX, 'Превышено макс. значение '),
  title: yup.string().min(1, 'Минимум 1 символ').max(100, 'Максимум 100 символов'),
})
const fromValidation = yup.object().shape({
  email: yup.string().email('Неверный формат'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать миниммум 6 символов')
    .max(100, 'Максимум 100 символов'),
})

export const FORM = {
  INIT: {
    AUTH: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },
    CONCERTS: {
      address: '',
      censor: '',
      composer: '',
      concertName: '',
      date: '',
      headliner: '',
      latitude: '',
      longitude: '',
      poster: '',
      price: 0,
      singerVoice: '',
      ticket: 0,
      title: '',
      type: '',
      wayHint: '',
    },
    PROMOCODES: {
      date: '',
      discount: 0,
      title: '',
    },
  },
  RESET: {
    censor: '',
    composer: '',
    concertName: '',
    headliner: '',
    singerVoice: '',
    wayHint: '',
  },
  VALIDATION: {
    CONCERTS: concertsValidation,
    FORM: fromValidation,
    PROMOCODES: promocodesValidation,
  },
}

export type ConcertsFormType = typeof FORM.INIT.CONCERTS
