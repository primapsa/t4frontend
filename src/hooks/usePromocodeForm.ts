import {PromocodeItemTypeForm} from "../components/Promocode/PromocodeForm";
import {useDispatch} from "react-redux";
import {useForm, yupResolver} from "@mantine/form";
import {FORM} from "../const/form";
import {addPromocode, editPromocode} from "../redux/promocodesReducer";
import {dateFormatDelimeter} from "../utils/utils";
import {AppDispatchType} from "../redux/store";

export const usePromocodeForm = ({onClose, initValues}:PromocodeItemTypeForm) => {

    const init = initValues ? {...initValues, date: new Date(initValues.date)} : initValues
    const dispatch = useDispatch()
    const form = useForm({
        validateInputOnBlur: true,
        initialValues: init || FORM.INIT.PROMOCODES,
        validate: yupResolver(FORM.VALIDATION.PROMOCODES),
    });
    const buttonDisable = !form.isValid()
    const buttonName = init ? 'Изменить' : 'Добавить'
    const currentDate = new Date()
    const executePromocode = init ? editPromocode : addPromocode

    const formHandler = form.onSubmit((fields) => {

        const promocode = {...fields, date: dateFormatDelimeter(new Date(fields.date).toISOString()), id: init?.id || 0}
        dispatch<AppDispatchType>(executePromocode(promocode))
        //form.reset()
        onClose()
    })

    return {
        formHandler,
        form,
        currentDate,
        buttonDisable,
        buttonName
    }
}