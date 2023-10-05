import React, {ChangeEvent, useEffect, useState} from 'react';
import {Flex, ScrollArea, TextInput} from '@mantine/core';
import {geoAPI, OpenStreetResponseType} from "../../api/api";
import {TextInputProps} from "@mantine/core/lib/TextInput/TextInput";
import {useStyles} from "./style";


const AddressAutocomplete = ({value, label, placeholder, onChange, onSetCoordinates, onBlur, ...rest}:
                                 TextInputProps & React.RefAttributes<HTMLInputElement> & OnSetCoordinates) => {

    const {classes} = useStyles()
    const [data, setData] = useState<AddressType[]>([])
    const [isFounded, setFounded] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e && onChange) {
            onChange(e)
        }
        if (isFounded) {
            setFounded(false)
        }
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        setFounded(true)
        if (e && onBlur) onBlur(e)
    }

    const menuItemClick = async (indx: number) => {
        const place = data.find((_, i) => i === indx)
        if (place) {
            setFounded(true)
            setData([])
            onSetCoordinates(place.location, place.name)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await geoAPI.mapGeocoding(value as string)
            const place = response.data.map((e: OpenStreetResponseType) =>
                (
                    {
                        address: e.display_name,
                        location: {lat: e.lat, lng: e.lon},
                        name: e.name
                    })
            )
            setData(place)
        }
        value && !isFounded ? fetch() : setData([])
    }, [value])

    return (
        <Flex className={classes.container}>
            <TextInput value={value}
                       onChange={onChangeHandler}
                       label={label}
                       placeholder={placeholder}
                       {...rest}
                       onBlur={onBlurHandler}
            />
            <Modal address={data} onAddress={menuItemClick} isHidden={isFounded}/>
        </Flex>
    )
}

const Modal = React.memo(({address = [], onAddress, isHidden}: ModalPropsType) => {
    const isDisplayed = !isHidden && !!address.length
    const {classes} = useStyles()
    const list = address
        .map((e, i) =>
            <div className={classes.item} key={i}
                 onMouseDown={(e) => e.preventDefault()}
                 onClick={() => onAddress(i)}>
                {e.address}
            </div>
        )

    return (
        <>
            {
                isDisplayed ?
                    <Flex className={classes.dropdown}>
                        <ScrollArea.Autosize mah={250}>
                            {list}
                        </ScrollArea.Autosize></Flex> :
                    null
            }
        </>
    )
})

export default React.memo(AddressAutocomplete)

type ModalPropsType = {
    address: AddressType[]
    onAddress: (i: number) => void
    isHidden: boolean
}
type AddressType = {
    address: string
    location: PlaceCoordinatesType
    name: string
}
type OnSetCoordinates = {
    onSetCoordinates: (coordinates: PlaceCoordinatesType, place: string) => void
}
export type PlaceCoordinatesType = {
    lat: string
    lng: string
}