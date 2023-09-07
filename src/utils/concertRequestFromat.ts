import {ConcertAddType, ConcertsType} from "../api/api";

export const formatConcertRequest = (fields: any) => {
    const outputFormData = new FormData()
    const concert = {
        ...fields,
        place: {
            address: fields.address,
            latitude: fields.latitude,
            longitude: fields.longitude
        },
        typeId: Number(fields.typeId),
        date: new Date(fields.date).toISOString()
    }
    let fieldsKey: keyof typeof concert
    for (fieldsKey in concert) {
        if (concert[fieldsKey]) {
            outputFormData.append(fieldsKey, concert[fieldsKey] as any)
        }
    }
    return outputFormData
}
export const formatConcertUpdateRequest = (fields: any) => {
    const outputFormData = new FormData()
    const concert = {
        ...fields,
        typeId: Number(fields.typeId),
        date: new Date(fields.date).toISOString()
    }
    let fieldsKey: keyof typeof concert
    for (fieldsKey in concert) {
        if (concert[fieldsKey]) {
            outputFormData.append(fieldsKey, concert[fieldsKey] as any)
        }
    }
    return outputFormData
}

