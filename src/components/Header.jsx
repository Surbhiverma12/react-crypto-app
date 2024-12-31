import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography
  , createTheme
 } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


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
        className="flex-1 text-cryptoGold font-montserratcursor-pointer !important"
        sx={{
          fontWeight: 800
        }}
      >
        Crypto Hunter
      </Typography>
      <Select 
        variant='outlined'
        className="w-24 h-10 ml-4"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
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