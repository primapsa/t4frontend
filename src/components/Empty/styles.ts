import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
  center: {
    height: '80vh',
  },
  imgContainer: {
    alignItems: 'center',
    display: 'flex',
    height: '300px',
    justifyContent: 'center',
    width: '200px',
  },
  round: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: '50%',
    display: 'flex',
    fontSize: '13px',
    height: '20px',
    justifyContent: 'center',
    lineHeight: '13px',
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    width: '20px',
  },
}))
