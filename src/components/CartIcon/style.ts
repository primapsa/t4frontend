import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    position: 'relative',
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
