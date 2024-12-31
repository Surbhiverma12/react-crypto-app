import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import { Container, createTheme, LinearProgress, TableContainer, Table, TableHead, TextField, ThemeProvider, Typography, TableRow, TableCell, TableBody, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from './Carousel'

const CoinsTable = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const { currency, symbol} = CryptoState();
  const navigate = useNavigate()
 

  const fetchCoins = async () => {
    setLoading(true)
    const {data} = await axios.get(CoinList(currency))

    setCoins(data)
    setLoading(false)
  }

  useEffect(()=>{
    fetchCoins();
  },[currency])

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: '#fff', // Sets primary color
          },
          mode: 'dark',
        },
      });

  // console.log(coins)

  const handleSearch = () => {
    return coins.filter((coin) => 
      coin.name.toLowerCase().includes(search) || 
      coin.symbol.toLowerCase().includes(search)
    )
  }

  // let profit =coin.price_change_percentage_24h >= 0;

  return (
    <ThemeProvider theme={darkTheme}>
        <Container className="text-center">
  <Typography 
    variant='h4'
    style={{
      margin: 18, fontFamily: 'Montserrat'
  }}
  >
    Cryptocurrency Prices by Market Cap
  </Typography>
  
  <TextField 
     label= 'Search For a Crypto Currency..' variant='outlined'
     style={{marginBottom:20, width: "100%" }}
     onChange={(e)=> setSearch(e.target.value)}
  />

  <TableContainer className="bg-cryptoHeader shadow-xl">
    <Table>
      <TableHead 
        style={{
          backgroundColor: '#EEBC1D'
      }}>
        <TableRow className="bg-cryptoGold">
          {['Coin', 'Price', "24h Change", 'Market Cap'].map((head) => (
            <TableCell
              className="text-black font-bold font-montserrat"
              key={head}
              align={head === 'Coin' ? '' : 'right'}
            >
              {head}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {handleSearch()
        .slice((page-1) * 10, (page-1) * 10 + 10)
        .map(row => {
          const profit = row.price_change_percentage_24h > 0;
          return (
            <TableRow 
              onClick={() => navigate(`/coins/${row.id}`)}
              key={row.name}
              className="bg-cryptoHeader-light hover:bg-cryptoHeader-dark cursor-pointer transition-colors duration-200 !important"
            >
              <TableCell 
                component='th'
                scope='row'
                className="flex items-center gap-4 !important"
              >
                <img 
                  src={row.image}
                  alt={row.name}
                  className="h-12 w-12 object-contain"
                />
                <div className="flex flex-col">
                  <span className="uppercase text-lg font-semibold">
                    {row.symbol}
                  </span>
                  <span className="text-gray-400">
                    {row.name}
                  </span>
                </div>
              </TableCell>
              <TableCell align='right'>
                {symbol} {numberWithCommas(row.current_price.toFixed(2))}
              </TableCell>
              <TableCell
                align='right'
                style={{
                  color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                  fontWeight: 500,
                }}
              >
                {profit && '+'}{row.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell align='right'>
                {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>

  <Pagination
    className="p-5 w-full flex justify-center !important"
    classes={{
      ul: "flex gap-2",
    }}
    sx={{
      '& .MuiPaginationItem-root': {
        color: 'gold', // Sets the color of the pagination numbers
      },
    }}
    count={(handleSearch()?.length/10).toFixed(0)}
    onChange={(_, value) => {
      setPage(value);
      window.scroll(0, 450);
    }}
  />
</Container>

    </ThemeProvider>
  )
}

export default CoinsTable