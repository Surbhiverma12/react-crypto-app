import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import ReactHtmlParser from 'html-react-parser'
import { useTheme } from '@mui/material/styles';
import "./CoinPage.css";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const CoinPage = () => {

  const { id } = useParams();
  const [ coin, setCoin] = useState()

  const {currency, symbol} = CryptoState()
  const theme = useTheme();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }
  // console.log("coin", coin)

  useEffect(()=>{
    fetchCoin();
  },[])

  if (!coin) 
    return <LinearProgress style={{backgroundColor: 'gold'}}/>

  return (
    <div className="container">
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="heading">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className="description">
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage