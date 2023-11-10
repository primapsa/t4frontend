import * as yup from 'yup';
import {PROMOCODES, TICKETS} from "./settings";

const concertsValidation = yup.object().shape({
    title: yup.string().min(1, 'Минимум 1 символ').max(100, 'Максимум 100 символов'),
    date: yup.date().required('Выберите дату и время'),
    type: yup.string().required('Выберите тип'),
    ticket: yup.number().min(TICKETS.COUNT.MIN, 'Недопустимое значение').max(TICKETS.COUNT.MAX, 'Превышено макс. значение '),
    price: yup.number().min(TICKETS.PRICE.MIN, 'Недопустимое значение').max(TICKETS.PRICE.MAX, 'Превышено макс. значение '),
    address: yup.string().min(1, 'Минимум 1 символ').max(100, 'Максимум 100 символов'),
    latitude: yup.string().matches(/\d+\.\d{5,}/, 'Введите корректную долготу, например: 41.40338'),
    longitude: yup.string().matches(/\d+\.\d{5,}/, 'Введите корректную широту, например: 2.17403'),
    poster: yup.mixed().test('isEmpty', 'Выберите файл', (value: any) => !!value.name).required('Выберите постер'),
    desc: yup.string().min(1, 'Минимум 1 символ').max(15000, 'Максимум 15000 символов'),
    censor: yup.string().when('type', (type: any, schema) => {
        return String(type) === '2' ? schema.required('Введите значение') : schema;
    }),
    singerVoice: yup.string().when('type', (type: any, schema) => {
        return String(type) === '1' ? schema.required('Выберите значение') : schema;
    }),
    concertName: yup.string().when('type', (type: any, schema) => {
        return String(type) === '1' ? schema.required('Введите значение') : schema;
    }),
    composer: yup.string().when('type', (type: any, schema) => {
        return String(type) === '1' ? schema.required('Введите значение') : schema;
    }),
    wayHint: yup.string().when('type', (type:any, schema) => {
        return String(type) === '3' ? schema.required('Обязательное поле') : schema.notRequired();
    }),
    headliner: yup.string().when('type', (type:any, schema) => {
        return String(type) === '3' ? schema.required('Обязательное поле') : schema.notRequired();
    })

})
const promocodesValidation = yup.object().shape({
    title: yup.string().min(1, 'Минимум 1 символ').max(100, 'Максимум 100 символов'),
    discount: yup.number().min(PROMOCODES.DISCOUNT.MIN, 'Недопустимое значение').max(PROMOCODES.DISCOUNT.MAX, 'Превышено макс. значение '),
    date: yup.date().required('Выберите дату и время'),
})
const fromValidation = yup.object().shape({
    password: yup.string().min(6, 'Пароль должен содержать миниммум 6 символов').max(100, 'Максимум 100 символов'),
    email: yup.string().email('Неверный формат'),
})

export const FORM = {
    INIT: {
        CONCERTS: {
            title: '',
            date: '',
            type: '',
            ticket: 0,
            price: 0,
            address: '',
            latitude: '',
            longitude: '',
            singerVoice: '',
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
            password: '',
            name: '',
            terms: true,
        }
    },
    RESET: {
        singerVoice: '',
        concertName: '',
        composer: '',
        wayHint: '',
        headliner: '',
        censor: ''
    },
    VALIDATION: {
        CONCERTS: concertsValidation,
        PROMOCODES: promocodesValidation,
        FORM: fromValidation
    }
}

export type ConcertsFormType = typeof FORM.INIT.CONCERTS