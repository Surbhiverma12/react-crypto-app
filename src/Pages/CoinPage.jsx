import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import ReactHtmlParser from 'html-react-parser'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) {
    return <LinearProgress className="bg-yellow-500" />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-[30%] flex flex-col items-center p-4 lg:p-6 lg:border-r border-gray-600">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          className="h-32 sm:h-48 mb-5 object-contain"
        />
        
        <Typography 
          variant="h3" 
          className="font-bold mb-4 text-center font-montserrat text-2xl sm:text-3xl lg:text-4xl"
        >
          {coin?.name}
        </Typography>
        
        <Typography
          variant="subtitle1"
          className="w-full font-montserrat px-2 lg:px-6 pb-4 text-justify text-gray-300 text-sm sm:text-base"
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>

        <div className="self-start w-full px-2 lg:px-6 pt-4 space-y-4 bg-gray-800/30 rounded-lg p-4">
          {/* Rank */}
          <div className="flex items-center justify-between">
            <Typography 
              variant="h5" 
              className="font-bold font-montserrat text-base sm:text-lg lg:text-xl"
            >
              Rank:
            </Typography>
            <Typography 
              variant="h5" 
              className="font-montserrat text-base sm:text-lg lg:text-xl"
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </div>

          {/* Current Price */}
          <div className="flex items-center justify-between">
            <Typography 
              variant="h5" 
              className="font-bold font-montserrat text-base sm:text-lg lg:text-xl"
            >
              Current Price:
            </Typography>
            <Typography 
              variant="h5" 
              className="font-montserrat text-base sm:text-lg lg:text-xl"
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </div>

          {/* Market Cap */}
          <div className="flex items-center justify-between">
            <Typography 
              variant="h5" 
              className="font-bold font-montserrat text-base sm:text-lg lg:text-xl"
            >
              Market Cap:
            </Typography>
            <Typography 
              variant="h5" 
              className="font-montserrat text-base sm:text-lg lg:text-xl"
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </div>
        </div>
      </div>
        <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage