import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../redux/store";
import {ConcertTypesType} from "../api/api";
import {getConcertType, getFilterQuery, getFilterType} from "../selectors/selectors";
import {useForm} from "@mantine/form";
import {useCallback, useEffect} from "react";
import {fetchConcertsTypes} from "../redux/concertsReducer";
import {resetFilter, setFilter} from "../redux/filterReducer";

export const useFilter = () => {

    const types = useSelector<RootStateType, ConcertTypesType[]>(getConcertType)
    const query = useSelector<RootStateType, string>(getFilterQuery)
    const type = useSelector<RootStateType, number>(getFilterType)
    const dispatch = useDispatch()

    const form = useForm({
        initialValues: {query, type},
    });

    useEffect(() => {
        dispatch<AppDispatchType>(fetchConcertsTypes())
    }, [])

    const formHandler = form.onSubmit((fields) => {
        dispatch<AppDispatchType>(setFilter(fields))
    })
    const resetHandler = useCallback(() => {
        dispatch<AppDispatchType>(resetFilter())
        form.reset()
    }, [])

    return {
        formHandler,
        form,
        types,
        resetHandler
    }
}