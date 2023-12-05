import { createStyles } from '@mantine/core'

export const useStyles = createStyles(theme => ({
  box: {
    maxWidth: '270px',
    [theme.fn.smallerThan('380')]: {
      maxWidth: '250px',
    },
    [theme.fn.smallerThan('570')]: {
      maxWidth: '100%',
    },
    [theme.fn.smallerThan('880')]: {
      maxWidth: '220px',
    },
    [theme.fn.smallerThan('1170')]: {
      maxWidth: '185px',
    },
    [theme.fn.smallerThan('1400')]: {
      maxWidth: '250px',
    },
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    position: 'relative',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: '0.25rem',
    boxShadow:
      '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 2.25rem 1.75rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 1.0625rem 1.0625rem -0.4375rem',
    flexDirection: 'column',
    padding: '5px',
    position: 'absolute',
    top: '60px',
    width: '100%',
    zIndex: 1,
  },
  item: {
    '&:hover': {
      backgroundColor: '#F8F9FA',
    },
    borderRadius: '0.25rem',
    color: 'black',
    cursor: 'pointer',
    fontSize: '12px',
    marginTop: '10px',
    padding: '5px 12px',
  },
  scroll: {
    maxHeight: '250px',
  },
  submit: {
    alignItems: 'center',
    justifyContent: 'right',
    marginTop: '20px',
    [theme.fn.smallerThan('450')]: {
      width: '200px',
    },
    width: '100%',
  },
  wrapper: {
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: '15px',
    [theme.fn.smallerThan('380')]: {
      maxWidth: '250px',
    },
    [theme.fn.smallerThan('570')]: {
      justifyContent: 'center',
    },
    [theme.fn.smallerThan('880')]: {
      flexWrap: 'wrap',
    },
  },
}))
