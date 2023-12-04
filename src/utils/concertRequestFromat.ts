import { FORM } from '../const/form'

export const formatConcertRequest = (fields: any) => {
  const outputFormData = new FormData()
  const concert = {
    ...fields,
    date: new Date(fields.date).toISOString(),
    place: {
      address: fields.address,
      latitude: fields.latitude,
      longitude: fields.longitude,
    },
    type: Number(fields.type),
  }
  let fieldsKey: keyof typeof concert

  for (fieldsKey in concert) {
    let value = concert[fieldsKey]

    if (value) {
      if (!(value instanceof File) && typeof value === 'object') {
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
    date: new Date(fields.date).toISOString(),
    typeId: Number(fields.typeId),
  }
  let fieldsKey: keyof typeof concert

  for (fieldsKey in concert) {
    outputFormData.append(fieldsKey, concert[fieldsKey] as any)
  }

  return outputFormData
}
