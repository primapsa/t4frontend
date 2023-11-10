import {FORM} from "../const/form";

export const formatConcertRequest = (fields: any) => {
    const outputFormData = new FormData()
    const concert = {
        ...fields,
        place: {
            address: fields.address,
            latitude: fields.latitude,
            longitude: fields.longitude
        },
        type: Number(fields.type),
        date: new Date(fields.date).toISOString()
    }
    let fieldsKey: keyof typeof concert
    for (fieldsKey in concert) {
        let value = concert[fieldsKey]
        if (value) {
            if(!(value instanceof File) && typeof value === 'object' ){

                value = JSON.stringify(value)

            }

            outputFormData.append(fieldsKey, value)
        }
    }
    return outputFormData
}
export const formatConcertUpdateRequest = (fields: any) => {
    const outputFormData = new FormData()
    const concert = {
        ...FORM.INIT.CONCERTS,
        ...fields,
        typeId: Number(fields.typeId),
        date: new Date(fields.date).toISOString()
    }
    let fieldsKey: keyof typeof concert
    for (fieldsKey in concert) {
        outputFormData.append(fieldsKey, concert[fieldsKey] as any)
    }

    return outputFormData
}

