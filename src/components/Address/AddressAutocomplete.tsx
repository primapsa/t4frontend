import React, { ChangeEvent, useEffect, useState } from 'react'

import { Flex, ScrollArea, TextInput } from '@mantine/core'
import { TextInputProps } from '@mantine/core/lib/TextInput/TextInput'

import { OpenStreetResponseType, geoAPI } from '../../api/api'
import { useStyles } from './style'

const AddressAutocomplete = ({
  label,
  onBlur,
  onChange,
  onSetCoordinates,
  placeholder,
  value,
  ...rest
}: TextInputProps & React.RefAttributes<HTMLInputElement> & OnSetCoordinates) => {
  const { classes } = useStyles()
  const [data, setData] = useState<AddressType[]>([])
  const [isFounded, setFounded] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e && onChange) {
      onChange(e)
    }
    if (isFounded) {
      setFounded(false)
    }
    setEdit(true)
  }

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFounded(true)
    if (e && onBlur) {
      onBlur(e)
    }
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
      const place = response.data.map((e: OpenStreetResponseType) => ({
        address: e.display_name,
        location: { lat: e.lat, lng: e.lon },
        name: e.name,
      }))

      setData(place)
    }

    value && !isFounded && isEdit ? fetch() : setData([])
  }, [value])

  return (
    <Flex className={classes.container}>
      <TextInput
        label={label}
        onChange={onChangeHandler}
        placeholder={placeholder}
        value={value}
        {...rest}
        onBlur={onBlurHandler}
      />
      <Modal address={data} isHidden={isFounded} onAddress={menuItemClick} />
    </Flex>
  )
}

const Modal = React.memo(({ address = [], isHidden, onAddress }: ModalPropsType) => {
  const isDisplayed = !isHidden && !!address.length
  const { classes } = useStyles()
  const list = address.map((e, i) => (
    <div
      className={classes.item}
      key={i}
      onClick={() => onAddress(i)}
      onMouseDown={e => e.preventDefault()}
    >
      {e.address}
    </div>
  ))

  return (
    <>
      {isDisplayed ? (
        <Flex className={classes.dropdown}>
          <ScrollArea.Autosize mah={250}>{list}</ScrollArea.Autosize>
        </Flex>
      ) : null}
    </>
  )
})

export default React.memo(AddressAutocomplete)

type ModalPropsType = {
  address: AddressType[]
  isHidden: boolean
  onAddress: (i: number) => void
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
