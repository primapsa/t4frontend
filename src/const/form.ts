import * as yup from 'yup';
import {TICKETS, PROMOCODES} from "./settings";

const concertsValidation = yup.object().shape({
    title: yup.string().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
    date: yup.date().required('Выберите дату и время'),
    typeId: yup.string().required('Выберите тип'),
    tickets: yup.number().min(TICKETS.COUNT.MIN, 'Недопустимое значение').max(TICKETS.COUNT.MAX, 'Превышено макс. значение '),
    price: yup.number().min(TICKETS.PRICE.MIN, 'Недопустимое значение').max(TICKETS.PRICE.MAX, 'Превышено макс. значение '),
    address: yup.string().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
    latitude: yup.string().matches(/\d+\.\d{5,}/, 'Введите корректную долготу, например: 41.40338'),
    longitude: yup.string().matches(/\d+\.\d{5,}/, 'Введите корректную широту, например: 2.17403'),
    poster: yup.mixed().required('Выберите постер'),
    desc: yup.string().min(3, 'Минимум 3 символа').max(500, 'Максимум 500 символов'),
})
const promocodesValidation = yup.object().shape({
    title: yup.string().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
    discount: yup.number().min(PROMOCODES.DISCOUNT.MIN, 'Недопустимое значение').max(PROMOCODES.DISCOUNT.MAX, 'Превышено макс. значение '),
    date: yup.date().required('Выберите дату и время'),
})
export const FORM = {
    INIT: {
        CONCERTS: {
            title: '',
            date: '',
            typeId: '',
            tickets: 0,
            price: 0,
            address: '',
            latitude: '',
            longitude: '',
            singerVoiceId: '',
            concertName: '',
            composer: '',
            wayHint: '',
            headliner: '',
            censor: '',
            poster: ''
        },
        PROMOCODES: {
            title: '',
            date: '',
            discount: 0
        },
        AUTH: {
            email: '',
            password: ''
        }
    },
    RESET: {
        singerVoiceId: '',
        concertName: '',
        composer: '',
        wayHint: '',
        headliner: '',
        censor: ''
    },
    VALIDATION: {
        CONCERTS: concertsValidation,
        PROMOCODES: promocodesValidation
    }
}

export type ConcertsFormType = typeof FORM.INIT.CONCERTS