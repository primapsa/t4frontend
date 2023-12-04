import { createStyles } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  control: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  control__price: {
    flexDirection: 'column',
  },
  icon: {
    position: 'absolute',
    right: '5px',
    top: '5px',
  },
  img: {
    height: '100px',
    width: '100px',
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: '10px',
    width: '100%',
  },
  paper: {
    margin: '10px 0',
    padding: '5px 50px 5px 5px',
    position: 'relative',
  },
  title: {
    fontWeight: 'bolder',
  },
  wrapper: {
    alignItems: 'flex-start',
    width: '100%',
  },
}))
