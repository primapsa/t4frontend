import { ConcertsType } from '../api/api'

export const concertInitAdapter = (fields: ConcertsType) => {
  const adapter = {
    ...fields,
    address: fields.place.address,
    date: new Date(fields.date),
    latitude: fields.place.latitude,
    longitude: fields.place.longitude,
  }
  let key: keyof typeof adapter

  for (key in adapter) {
    if (adapter[key] === null) {
      // @ts-ignore
      adapter[key] = ''
    }
  }

  return adapter
}
