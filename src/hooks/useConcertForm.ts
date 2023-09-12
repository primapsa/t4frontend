import {concertInitAdapter} from "../utils/concertInitAdapter";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../redux/store";
import {ConcertTypesType, SingerVoiceType} from "../api/api";
import {getConcertType, getSingerVoice} from "../selectors/selectors";
import {useForm, yupResolver} from "@mantine/form";
import {FORM} from "../const/form";
import {formatConcertRequest, formatConcertUpdateRequest} from "../utils/concertRequestFromat";
import {addNewConcert, ConcertErrorsType, updateConcert} from "../redux/concertsReducer";
import {AppStatus} from "../redux/appReducer";
import {STATUS} from "../const/statuses";

export const useConcertForm = ({init, onClose}: InitialValuesType) => {

    const initial = init ? concertInitAdapter(init) : init
    const [concertType, setConcertType] = useState<Number>(Number(initial?.typeId || ''))
    const concertsType = useSelector<RootStateType, ConcertTypesType[]>(getConcertType)
    const singerVoice = useSelector<RootStateType, SingerVoiceType[]>(getSingerVoice)
    const errors = useSelector<RootStateType, ConcertErrorsType | null>(state => state.concerts.errors)
    const status = useSelector<RootStateType, AppStatus>(state => state.concerts.status)

    const currentDate = new Date();
    const dispatch = useDispatch()

    const form = useForm({

        validateInputOnBlur: true,
        initialValues: initial || FORM.INIT.CONCERTS,
        validate: yupResolver(FORM.VALIDATION.CONCERTS),
    });

    const onChangeHandler = useCallback(async (value: string) => {

        form.setFieldValue('typeId', value)
        setConcertType(Number(value))
        form.setValues(FORM.RESET)
    }, [])

    useEffect(() => {
        if (status === STATUS.ERROR && errors) {
            form.setErrors(errors)
        }
        if (status === STATUS.SUCCESS) {
            onClose()
        }
    }, [status])

    const formHandler = form.onSubmit((fields) => {

        const formatted = formatConcertRequest(fields)
        init ?
            dispatch<AppDispatchType>(updateConcert({id: initial.id, concert: formatConcertUpdateRequest(fields)})) :
            dispatch<AppDispatchType>(addNewConcert(formatted))

    })

    return {
        form,
        formHandler,
        currentDate,
        onChangeHandler,
        concertsType,
        concertType,
        singerVoice
    }
}

export type InitialValuesType = {
    init: undefined | any
    onClose: () => void
}