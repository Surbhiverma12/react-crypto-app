import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api'

// Utility function for number formatting
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();
  
    const fetchTrendingCoins = async () => {
      try {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };
  
    useEffect(() => {
      fetchTrendingCoins();
    }, [currency]);
  
    const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;
  
      return (
        <Link
          key={coin.id}
          to={`/coins/${coin.id}`}
          className="flex flex-col items-center cursor-pointer uppercase text-white p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-300"
        >
          <img
            src={coin?.image}
            alt={coin.name}
            className="h-20 mb-2.5 object-contain hover:scale-110 transition-transform duration-300"
          />
          <div className="flex items-center gap-1">
            <span className="font-medium">{coin?.symbol}</span>
            <span
              className={`font-medium ${
                profit ? "text-green-500" : "text-red-500"
              }`}
            >
              {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
          <span className="text-2xl font-medium mt-1">
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </Link>
      );
    });
  
    const responsive = {
      0: { items: 2 },
      512: { items: 4 },
    };
  
    return (
      <div className="h-1/2 flex items-center w-full">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
          className="w-full"
        />
      </div>
    );
  };
  
  export default Carousel;