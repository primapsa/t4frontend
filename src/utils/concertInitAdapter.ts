import {ConcertsType} from "../api/api";

export const concertInitAdapter = (fields: ConcertsType) => {
    const adapter = {
        ...fields, date: new Date(fields.date), typeId: String(fields.typeId_id),
        singerVoiceId: String(fields.singerVoiceId_id)
    }
    let key: keyof typeof adapter
    for (key in adapter){
        if(adapter[key] === null){
            // @ts-ignore
            adapter[key] = ''
        }
    }
    return adapter
}

//ConcertsFormType