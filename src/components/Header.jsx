import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography
  , createTheme
 } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


// const title = styled('Toolbar')({
//   flex: 1,
//   color: 'gold',
//   fontFamily: 'Montserrat',
//   fontWeight: 'bold',
//   cursor: 'pointer'
// });

const Header = () => {

  const navigate = useNavigate()
  const { currency, setCurrency} = CryptoState()

  const handleTitleClick = () => {
    navigate('/')
  }

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff', // Sets primary color
      },
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography 
            variant='h6'
             onClick={handleTitleClick}
            sx={{
              flex: 1,
              color: 'gold',
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}>Crypto Hunter</Typography>

            <Select variant='outlined' 
              style={{width: 100,
                      height: 40,
                      marginLeft: 15,
              }}
              value = {currency}
              onChange={(e) => {
                setCurrency(e.target.value)
              }}
              >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header