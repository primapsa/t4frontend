import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
  address: {
    marginBottom: '10px',
  },
  address__text: {
    fontWeight: 'normal',
    marginLeft: '10px',
  },
  buy: {
    justifyContent: 'right',
  },
  date: {
    flexDirection: 'column',
    marginLeft: '10px',
  },
  date__text: {
    fontWeight: 'normal',
  },
  img: {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  title: {
    fontWeight: 'bolder',
    height: '50px',
    margin: '5px 0',
    textAlign: 'center',
  },
  wallet: {
    margin: '10px 0',
  },
  wrapper: {
    height: '100%',
    margin: '10px',
    maxWidth: '300px',
    padding: '10px',
  },
}))
